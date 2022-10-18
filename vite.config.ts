import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'ThreeWay',
      // the proper extensions will be added
      fileName: 'three-way'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into thre library
      external: ['three'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'THREE'
        }
      }
    }
  }
})