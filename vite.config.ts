import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const fromSrc = (path: string) => fileURLToPath(new URL(`./src/${path}`, import.meta.url));

export default defineConfig({
  plugins: [svelte()],
  base: './',
  resolve: {
    alias: {
      '$app/navigation': fromSrc('shims/navigation.ts'),
      '$lib': fromSrc('lib')
    }
  },
  build: {
    outDir: 'dist/electris',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    rollupOptions: {
      input: fromSrc('main.ts'),
      output: {
        entryFileNames: 'electris.js',
        assetFileNames: (asset) =>
          asset.names.some((name) => name.endsWith('.css')) ? 'electris.css' : 'assets/[name]-[hash][extname]'
      }
    }
  }
});
