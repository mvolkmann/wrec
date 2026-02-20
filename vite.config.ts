import {defineConfig} from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/wrec.ts'),
      name: 'wrec',
      // file name of output bundle
      fileName: format => `wrec.${format}.js`
    },
    outDir: path.resolve(__dirname, 'dist')
  },
  plugins: [
    dts({
      exclude: [path.resolve(__dirname, 'src/examples/**')],
      rollupTypes: true // combines all defined types in a single .d.ts file
    })
  ]
});
