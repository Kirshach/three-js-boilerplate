import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'ThreeWay',
      // the proper extensions will be added
      formats: ['es'],
      fileName: 'three-way'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into the library
      external: [
        // 'three',
        // 'three/examples/jsm/loaders/DRACOLoader',
        // 'three/examples/jsm/controls/OrbitControls',
        // 'three/examples/jsm/loaders/GLTFLoader'
      ],
      output: {
        // Provide global variables to use in the build
        // (peer deps, essentially, cause there would be no i.e. 'THREE' in the build)
        globals: {
          // 'three': 'THREE',
          // 'three/examples/jsm/loaders/DRACOLoader': 'DRACOLoader',
          // 'three/examples/jsm/controls/OrbitControls': 'OrbitControls',
          // 'three/examples/jsm/loaders/GLTFLoader': 'GLTFLoader',
        },
      },
    },
  },
});
