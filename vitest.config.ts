import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      setupFiles: ["./vitest.setup.ts"],
      include: ["**/*.test.ts"],
      globals: true,
      environment: "node",
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
      },
    },
  }),
);
