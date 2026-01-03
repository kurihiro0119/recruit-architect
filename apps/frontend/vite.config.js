import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
    plugins: [
        react(),
        {
            name: 'html-transform',
            transformIndexHtml: function (html) {
                return html.replace(/%VITE_API_URL%/g, process.env.VITE_API_URL || 'http://localhost:8787');
            },
        },
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
