import { defineConfig } from "tsup";

import { dependencies } from "./package.json";

export default defineConfig({
  name: "dob-render-sdk",
  splitting: true,
  clean: true,
  bundle: true,
  dts: true,
  target: "es2021",
  format: ["esm", "cjs"],
  entry: ["src/index.ts"],
  external: [...Object.keys(dependencies)],
  platform: "neutral",
  // minify: true,
});
