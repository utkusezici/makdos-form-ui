import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import ora from "ora";
import { execSync } from "child_process";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const registry = require("../registry.json");
const REGISTRY_BASE_URL = "https://raw.githubusercontent.com/utkusezici/makdos-form-ui/main/packages/registry";
const typedRegistry = registry;
async function fetchFile(filePath) {
    const url = `${REGISTRY_BASE_URL}/${filePath}`;
    const res = await fetch(url);
    if (!res.ok)
        throw new Error(`Failed to fetch ${filePath}: ${res.statusText}`);
    return res.text();
}
async function installComponent(name, destPath, installed, npmDepsToInstall) {
    if (installed.has(name))
        return;
    installed.add(name);
    const component = typedRegistry[name];
    if (!component) {
        console.log(chalk.red(`  ✗ Component "${name}" not found in registry`));
        return;
    }
    // Önce registry bağımlılıklarını kur
    for (const dep of component.registryDependencies) {
        await installComponent(dep, destPath, installed, npmDepsToInstall);
    }
    // Dosyaları indir ve kopyala
    for (const file of component.files) {
        const targetFile = path.join(destPath, file);
        await fs.ensureDir(path.dirname(targetFile));
        // Zaten varsa atla
        if (await fs.pathExists(targetFile)) {
            console.log(chalk.gray(`  ~ ${file} (already exists, skipped)`));
            continue;
        }
        const content = await fetchFile(file);
        await fs.writeFile(targetFile, content, "utf-8");
        console.log(chalk.green(`  ✓ ${file}`));
    }
    // npm bağımlılıklarını topla
    for (const dep of component.npmDependencies) {
        npmDepsToInstall.add(dep);
    }
}
function detectPackageManager() {
    try {
        if (fs.existsSync("bun.lockb"))
            return "bun";
        if (fs.existsSync("pnpm-lock.yaml"))
            return "pnpm";
        if (fs.existsSync("yarn.lock"))
            return "yarn";
    }
    catch { }
    return "npm";
}
export async function add(components, options) {
    if (components.length === 0) {
        console.log(chalk.yellow("\nNo components specified."));
        console.log(chalk.gray("Usage: npx @makdosdev/form-ui add <component>"));
        console.log(chalk.gray("List:  npx @makdosdev/form-ui list\n"));
        return;
    }
    const destPath = path.resolve(process.cwd(), options.path);
    const installed = new Set();
    const npmDepsToInstall = new Set();
    console.log(chalk.bold(`\nAdding components to ${chalk.cyan(options.path)}\n`));
    const spinner = ora("Fetching components...").start();
    try {
        for (const name of components) {
            if (!typedRegistry[name]) {
                spinner.fail(`Component "${name}" not found.`);
                console.log(chalk.gray(`Run "npx @makdosdev/form-ui list" to see available components.\n`));
                return;
            }
        }
        spinner.stop();
        for (const name of components) {
            console.log(chalk.bold(`\n${name}:`));
            await installComponent(name, destPath, installed, npmDepsToInstall);
        }
        // npm bağımlılıklarını kur
        if (npmDepsToInstall.size > 0) {
            const pm = detectPackageManager();
            const depsList = Array.from(npmDepsToInstall).join(" ");
            const installCmd = pm === "yarn" ? `yarn add ${depsList}` :
                pm === "pnpm" ? `pnpm add ${depsList}` :
                    pm === "bun" ? `bun add ${depsList}` :
                        `npm install ${depsList}`;
            console.log(chalk.bold(`\nInstalling dependencies:`));
            console.log(chalk.gray(`  ${installCmd}\n`));
            const depSpinner = ora("Installing...").start();
            execSync(installCmd, { stdio: "ignore" });
            depSpinner.succeed("Dependencies installed");
        }
        console.log(chalk.green(chalk.bold("\nDone!\n")));
    }
    catch (err) {
        spinner.fail("Something went wrong.");
        console.error(chalk.red(err.message));
    }
}
