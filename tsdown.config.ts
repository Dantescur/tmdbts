import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "./src/index.ts",
  dts: {
    compilerOptions: {
      declarationMap: true,
    },
  },
  attw: true,
  publint: true,
  exports: true,
  outputOptions: {
    globals: {
      axios: "axios",
    },
  },
  unused: {
    level: "error",
  },
  format: ["esm", "cjs", "iife"],
  name: "tmdbts",
  globalName: "TMDBTS",
  external: ["axios"],
  minify: process.env.NODE_ENV === "production",
  target: "es2020",
  platform: "neutral",
  onSuccess() {
    console.info("🙏 Build succeeded!");
  },
});
