import { defineConfig } from 'vite';
import { UserConfig } from 'vitest';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        global: true,
        setupFiles: ['./src/algorithms/setup.ts', './src/credit-card/setupTest.ts'],
        environment: 'jsdom',
    },
});
