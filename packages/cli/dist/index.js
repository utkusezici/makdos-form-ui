#!/usr/bin/env node
import { Command } from "commander";
import { add } from "./commands/add.js";
import { list } from "./commands/list.js";
import { init } from "./commands/init.js";
const program = new Command();
program
    .name("makdos-form-ui")
    .description("Add Makdos Form UI components to your project")
    .version("0.1.0");
program
    .command("init")
    .description("Add the theme CSS file to your project")
    .action(init);
program
    .command("add [components...]")
    .description("Add components to your project")
    .option("-p, --path <path>", "destination path for components (overrides makdos.config.json)")
    .action(add);
program
    .command("list")
    .description("List all available components")
    .action(list);
program.parse();
