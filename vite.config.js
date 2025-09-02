import { defineConfig } from 'vite';
import path from 'path';
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  plugins: [eslintPlugin({
    cache: false, // optional: Fehler sofort aktualisieren
    include: ['src/**/*.js'],
    exclude: ['node_modules'],
  })],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'gedepiar',
      fileName: (format) => `gedepiar.${format}.js`,
      formats: ['umd'], // UMD für breite Kompatibilität
    },
    rollupOptions: {
      output: {
        globals: {
        },
      },
    },
    minify: 'esbuild',
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/css/variables.scss" as *;',
      },
    },
  },
});
