import {defineConfig} from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  // This is required for "npm run test" to work.
  root: path.resolve(__dirname, 'src'),
  build: {
    emptyOutDir: true,
    lib: {
      // The bundle exports everything exported by this file.
      entry: path.resolve(__dirname, 'src/wrec.ts'),
      name: 'wrec',
      // file name of output bundle
      fileName: format => `wrec.${format}.js`,
      formats: ['es', 'umd']
    },
    // Without this line, the dist directory will be
    // created relative to root which is src.
    outDir: path.resolve(__dirname, 'dist')
  },
  plugins: [
    dts({
      exclude: [path.resolve(__dirname, 'src/examples/**')],
      rollupTypes: true, // combines all defined types in a single .d.ts file
      tsconfigPath: './tsconfig.json',
      root: __dirname
    })
  ]
});
