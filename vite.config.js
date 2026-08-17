import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
//import { bunny } from 'laravel-vite-plugin/fonts';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
       laravel([
            'resources/css/app.css',
            'resources/js/app.jsx',
        ]),
        react(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
