import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,      // permet d'utiliser describe/test/expect sans import
    environment: 'node' // ou 'jsdom' pour du code orienté navigateur
  }
});