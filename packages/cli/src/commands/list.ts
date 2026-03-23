import chalk from "chalk";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const registry = require("../registry.json");

export function list() {
  console.log(chalk.bold("\nAvailable components:\n"));

  const components = Object.keys(registry);

  components.forEach((name) => {
    const component = registry[name as keyof typeof registry];
    const deps = component.registryDependencies.length > 0
      ? chalk.gray(` (requires: ${component.registryDependencies.join(", ")})`)
      : "";
    console.log(`  ${chalk.cyan(name)}${deps}`);
  });

  console.log(chalk.gray(`\nTotal: ${components.length} components`));
  console.log(chalk.gray(`\nUsage: npx @makdosdev/form-ui add <component>\n`));
}
