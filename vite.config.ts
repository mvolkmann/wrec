import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/wrec.ts',
      name: 'wrec',
      // file name of output bundle
      fileName: format => `wrec.${format}.js`
    }
  },
  plugins: [dts({exclude: ['src/examples/**']})]
});
