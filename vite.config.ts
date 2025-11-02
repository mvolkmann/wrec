import {defineConfig} from 'vite';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/wrec.ts'),
      name: 'wrec',
      // file name of output bundle
      fileName: format => `wrec.${format}.js`
    },
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true
  }
});
