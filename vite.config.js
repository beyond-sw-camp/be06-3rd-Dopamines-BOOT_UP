import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import babel from 'vite-plugin-babel';

export default defineConfig({
    plugins: [
        vue(),
        babel({
            babelConfig: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime'],
            },
        }),
    ],
});