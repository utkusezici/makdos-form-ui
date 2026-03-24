import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import ora from "ora";
import { execSync } from "child_process";

const THEME_URL =
  "https://raw.githubusercontent.com/utkusezici/makdos-form-ui/main/packages/registry/makdos-theme.css";

function detectPackageManager(): "npm" | "yarn" | "pnpm" | "bun" {
  try {
    if (fs.existsSync("bun.lockb")) return "bun";
    if (fs.existsSync("pnpm-lock.yaml")) return "pnpm";
    if (fs.existsSync("yarn.lock")) return "yarn";
  } catch {}
  return "npm";
}

function detectFramework(): "nextjs" | "vite" | "unknown" {
  try {
    const pkgPath = path.resolve(process.cwd(), "package.json");
    if (!fs.existsSync(pkgPath)) return "unknown";
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
    if ("next" in allDeps) return "nextjs";
    if ("vite" in allDeps) return "vite";
  } catch {}
  return "unknown";
}

function isTailwindInstalled(): boolean {
  try {
    const pkgPath = path.resolve(process.cwd(), "package.json");
    if (!fs.existsSync(pkgPath)) return false;
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
    return "tailwindcss" in allDeps;
  } catch {
    return false;
  }
}

export async function init() {
  console.log(chalk.bold("\nInitializing Makdos Form UI...\n"));

  const spinner = ora("Fetching theme file...").start();

  try {
    const res = await fetch(THEME_URL);
    if (!res.ok) throw new Error(`Failed to fetch theme: ${res.statusText}`);
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

    const framework = detectFramework();
    const pm = detectPackageManager();

    // Tailwind kurulu değilse kur
    if (!isTailwindInstalled()) {
      if (framework === "nextjs") {
        const installCmd =
          pm === "yarn" ? "yarn add -D tailwindcss @tailwindcss/postcss postcss" :
          pm === "pnpm" ? "pnpm add -D tailwindcss @tailwindcss/postcss postcss" :
          pm === "bun"  ? "bun add -D tailwindcss @tailwindcss/postcss postcss" :
          "npm install -D tailwindcss @tailwindcss/postcss postcss";

        const twSpinner = ora("Installing Tailwind CSS...").start();
        execSync(installCmd, { stdio: "ignore" });
        twSpinner.succeed("Tailwind CSS installed");

        // postcss.config.mjs oluştur
        const postcssPath = path.resolve(process.cwd(), "postcss.config.mjs");
        if (!fs.existsSync(postcssPath)) {
          await fs.writeFile(postcssPath, `export default {\n  plugins: {\n    "@tailwindcss/postcss": {},\n  },\n};\n`, "utf-8");
          console.log(chalk.green("✓ postcss.config.mjs created"));
        }
      } else {
        // Vite veya unknown
        const installCmd =
          pm === "yarn" ? "yarn add -D tailwindcss @tailwindcss/vite" :
          pm === "pnpm" ? "pnpm add -D tailwindcss @tailwindcss/vite" :
          pm === "bun"  ? "bun add -D tailwindcss @tailwindcss/vite" :
          "npm install -D tailwindcss @tailwindcss/vite";

        const twSpinner = ora("Installing Tailwind CSS...").start();
        execSync(installCmd, { stdio: "ignore" });
        twSpinner.succeed("Tailwind CSS installed");

        console.log(chalk.bold("\nAdd the Tailwind plugin to your vite.config.ts:\n"));
        console.log(chalk.cyan('  import tailwindcss from "@tailwindcss/vite"'));
        console.log(chalk.cyan("  plugins: [react(), tailwindcss()]"));
      }
    } else {
      console.log(chalk.gray("✓ Tailwind CSS already installed"));
    }

    console.log(chalk.bold("\nImport the theme in your global CSS (e.g. src/index.css or app/globals.css):\n"));
    console.log(chalk.cyan('  @import "tailwindcss";'));
    console.log(chalk.cyan('  @import "./makdos-theme.css";'));
    console.log(chalk.gray("\nYou can customize colors in makdos-theme.css."));
    console.log(chalk.gray("Edit makdos.config.json to change the components destination path.\n"));
  } catch (err) {
    spinner.fail("Something went wrong.");
    console.error(chalk.red((err as Error).message));
  }
}
