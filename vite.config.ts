import { defineConfig } from "vite";
import path from "path";
import { dts } from "rolldown-plugin-dts";

export default defineConfig({
  // plugins: [dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "tsmdb",
      fileName: (format) => `tsmdb.${format === "es" ? "mjs" : "cjs"}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["axios"],
      output: {
        globals: {
          axios: "axios",
        },
      },
    },
  },
});
