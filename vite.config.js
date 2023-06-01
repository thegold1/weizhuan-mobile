import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
    const env = loadEnv(mode, process.cwd())
    const { VITE_APP_BASE_API, VITE_APP_API_URL } = env;

    return {
        plugins: [ vue(),Components({
            resolvers: [VantResolver()],
        }), ],
        resolve: {
            // https://cn.vitejs.dev/config/#resolve-alias
            alias: {
                // 设置路径
                '~': path.resolve(__dirname, './'),
                // 设置别名
                '@': path.resolve(__dirname, './src')
            },
            // https://cn.vitejs.dev/config/#resolve-extensions
            extensions: [ '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue' ]
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "./src/assets/styles/variables.module.scss";'
                }
            }
        },
        server: {
            port: 80,
            host: '0.0.0.0',
            open: true,
            proxy: {
                // https://cn.vitejs.dev/config/#server-proxy
                [ VITE_APP_BASE_API ]: {
                    target: VITE_APP_API_URL,
                    changeOrigin: true,
                    rewrite: (p) => p.replace(VITE_APP_BASE_API, '')
                }
            }
        },
    }
})
