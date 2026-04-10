import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/main.ts", "src/preload.ts"],
  format: ["cjs"],
  outDir: "dist",
  sourcemap: true,
  platform: "node",
  target: "node22",
  splitting: false,
  external: ["electron"],
  noExternal: [/^@repo\/desktop-bridge$/, /^@repo\/tooling$/],
});
