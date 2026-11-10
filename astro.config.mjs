import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://edinguso.github.io',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
