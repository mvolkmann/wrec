import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  // This is required for "npm run test" to work.
  root: path.resolve(import.meta.dirname, "src"),
});
