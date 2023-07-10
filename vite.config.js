import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue'],
      dirs: ['./composables'],
      vueTemplate: true,
    }),
    Components({
      dirs: [
        './components/',
        // Component folders that should be auto-imported
      ],
      dts: true,
      directoryAsNamespace: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
      '~': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
})
