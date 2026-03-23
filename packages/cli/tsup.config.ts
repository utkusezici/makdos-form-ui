import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],
  outDir: "dist",
  bundle: true,
  minify: false,
  splitting: false,
  clean: true,
  noExternal: ["chalk", "commander", "fs-extra", "ora"],
});
