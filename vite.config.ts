import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { threeMinifier } from "@yushijinhun/three-minifier-rollup";

export default defineConfig({
  plugins: [
    // TODO: test the minifier
    { ...threeMinifier(), enforce: 'pre' },
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    minify: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'ThreeWay',
      // the proper extensions will be added
      formats: ['es'],
      fileName: 'three-way'
    },
    rollupOptions: {
      // to externalize deps that shouldn't be bundled into the library
      external: [
        'three',
        'three/examples/jsm/loaders/DRACOLoader',
        'three/examples/jsm/controls/OrbitControls',
        'three/examples/jsm/loaders/GLTFLoader'
      ],
      output: {
        // Provide global variables to use in the build
        // (peer deps, essentially, cause there would be no i.e. 'THREE' in the build)
        globals: {
          'three': 'THREE',
          'three/examples/jsm/loaders/DRACOLoader': 'DRACOLoader',
          'three/examples/jsm/controls/OrbitControls': 'OrbitControls',
          'three/examples/jsm/loaders/GLTFLoader': 'GLTFLoader',
        },
      },
    },
  },
});
