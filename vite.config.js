import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ command }) => {
  const isServe = command === 'serve';
  const basePath = isServe ? '/' : '/cheerful_monk/';

  return {
    base: basePath,
    root: 'src',

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@img': fileURLToPath(new URL('./src/img', import.meta.url)),
        '@css': fileURLToPath(new URL('./src/css', import.meta.url)),
        '@js': fileURLToPath(new URL('./src/js', import.meta.url)),
      },
    },

    build: {
      outDir: '../dist',
      emptyOutDir: true,

      rollupOptions: {
        input: glob.sync('**/*.html', { cwd: 'src', absolute: true }),

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
  };
});
