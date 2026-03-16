import {defineConfig} from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        wrec: path.resolve(__dirname, 'src/wrec.ts'),
        'wrec-ssr': path.resolve(__dirname, 'src/wrec-ssr.ts')
      },
      name: 'wrec',
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ['es']
    },
    // Without this line, the dist directory will be
    // created relative to root which is src.
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      external: ['node-html-parser', 'xss']
    }
  },
  plugins: [
    dts({
      exclude: [path.resolve(__dirname, 'src/examples/**')],
      rollupTypes: true, // combines all defined types in a single .d.ts file
      tsconfigPath: './tsconfig.json'
    })
  ],
  resolve: {
    alias: {
      canvas: './src/empty-shim.js'
    }
  }
});
