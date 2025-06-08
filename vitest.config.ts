import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["**/*.test.ts"],
      globals: true,
      setupFiles: ["vitest.setup.ts"],
      environment: "node",
      reporters: ["default", "html"],
      coverage: {
        enabled: true,
        provider: "v8",
        reporter: ["text", "json", "html"],
      },
    },
  }),
);
