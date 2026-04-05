import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/cheerful_monk/',
  root: 'src',

  resolve: {
    alias: {
      '@': '/src',
      '@img': '/src/img',
      '@css': '/src/css',
      '@js': '/src/js',
    },
  },

  build: {
    outDir: '../dist',
    emptyOutDir: true,

    rollupOptions: {
      input: glob.sync('./src/**/*.html'),

      output: {
        entryFileNames: 'assets/js/[name].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },

  plugins: [
    injectHTML(),
    FullReload(['./src/**/*.html']),
    SortCss({ sort: 'mobile-first' }),
  ],
}));
