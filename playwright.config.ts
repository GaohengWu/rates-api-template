import { defineConfig } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'https://shop.tl-academy.ee';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,
    extraHTTPHeaders: { Accept: 'application/json' },
    ignoreHTTPSErrors: true,
  },
});
