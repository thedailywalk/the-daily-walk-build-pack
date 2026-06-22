import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
      // "server-only" is a Next build marker with no node entry; stub it in tests.
      "server-only": path.resolve(process.cwd(), "src/test/empty.ts"),
    },
  },
});
