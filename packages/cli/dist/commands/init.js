import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import ora from "ora";
const THEME_URL = "https://raw.githubusercontent.com/utkusezici/makdos-form-ui/main/packages/registry/makdos-theme.css";
export async function init() {
    console.log(chalk.bold("\nInitializing Makdos Form UI...\n"));
    const spinner = ora("Fetching theme file...").start();
    try {
        const res = await fetch(THEME_URL);
        if (!res.ok)
            throw new Error(`Failed to fetch theme: ${res.statusText}`);
        const content = await res.text();
        const destPath = path.resolve(process.cwd(), "makdos-theme.css");
        await fs.writeFile(destPath, content, "utf-8");
        spinner.succeed("makdos-theme.css created");
        // makdos.config.json oluştur (yoksa)
        const configPath = path.resolve(process.cwd(), "makdos.config.json");
        if (!await fs.pathExists(configPath)) {
            await fs.writeFile(configPath, JSON.stringify({ path: "src/components/FormElements" }, null, 2), "utf-8");
            console.log(chalk.green("✓ makdos.config.json created"));
        }
        console.log(chalk.bold("\nNext step — import it in your global CSS:\n"));
        console.log(chalk.cyan('  @import "tailwindcss";'));
        console.log(chalk.cyan('  @import "./makdos-theme.css";'));
        console.log(chalk.gray("\nYou can now customize the colors in makdos-theme.css."));
        console.log(chalk.gray("Edit makdos.config.json to change the components destination path.\n"));
    }
    catch (err) {
        spinner.fail("Something went wrong.");
        console.error(chalk.red(err.message));
    }
}
