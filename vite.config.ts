import { defineConfig } from "vite";
import path from "path";
import dts from "vite-plugin-dts";

const dirname = import.meta.dirname; // destructuring doesn't work here

export default defineConfig({
  root: path.resolve(dirname, "src"),
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        wrec: path.resolve(dirname, "src/wrec.ts"),
        "wrec-ssr": path.resolve(dirname, "src/wrec-ssr.ts"),
      },
      name: "wrec",
      // Names each bundle using its entry name and output format.
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ["es"],
    },
    // Without this line, the dist directory will be
    // created relative to root which is src.
    outDir: path.resolve(dirname, "dist"),
    rollupOptions: {
      external: ["xss"],
    },
  },
  plugins: [
    dts({
      exclude: [path.resolve(dirname, "src/examples/**")],
      bundleTypes: true, // combines all defined types in a single .d.ts file
      tsconfigPath: path.resolve(dirname, "tsconfig.json"),
    }),
  ],
  resolve: {
    alias: {
      canvas: path.resolve(import.meta.dirname, "src/empty-shim.js"),
    },
  },
});
