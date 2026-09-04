import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
//import { bunny } from 'laravel-vite-plugin/fonts';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
       laravel([
            'resources/css/app.css',
            'resources/css/admin.css',
            'resources/css/admin-crud.css',
            'resources/css/alumni.css',
            'resources/css/alumniprofile.css',
            'resources/css/alumnisettings.css',
            'resources/css/campus.css',
            'resources/css/campususer.css',
            'resources/css/lowonganuser.css',
            'resources/css/perusahaan.css',
            'resources/css/profile.css',
            'resources/css/reports.css',
            'resources/css/scholarshipuser.css',
            'resources/css/settings.css',
            'resources/css/tracer-study.css',
            'resources/css/user-dashboard.css',
            'resources/css/usertracer-study.css',
            'resources/js/app.jsx',
            'resources/js/profile.jsx',
        ]),
        react(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
