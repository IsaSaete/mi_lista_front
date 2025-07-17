import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  test: {
    root: "src",
    globals: true,
    reporters: [`verbose`],
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"],
    coverage: {
      reportsDirectory: "../coverage",
      exclude: ["main.tsx", "vite-env.d.ts", "**/types.ts"],
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["**/*.ts", "**/*.tsx"],
    },
  },
  plugins: [react()],
});
