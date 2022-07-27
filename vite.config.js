import { createVuePlugin } from 'vite-plugin-vue2';
import { defineConfig, loadEnv } from 'vite';
import viteComponents, {
  VuetifyResolver,
} from 'vite-plugin-components';
import path from 'path';

/**
 * @type {import('vite').UserConfig}
 */
export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  const env = loadEnv(mode, "env");
  const htmlPlugin = () => {
    return {
      name: "html-transform",
      transformIndexHtml(html) {
          return html.replace(/%(.*?)%/g, function (match, p1) {
              return env[p1];
          });
      },
    };
  };
  return defineConfig({
    resolve: {
      alias: [
        {
          find: '@/',
          replacement: `${path.resolve(__dirname, './src')}/`,
        },
        {
          find: 'src/',
          replacement: `${path.resolve(__dirname, './src')}/`,
        },
      ],
    },
    plugins: [
      createVuePlugin(),
      viteComponents({
        customComponentResolvers: [
          VuetifyResolver(),
        ],
      }), 
      htmlPlugin(),
    ],
    server: {
      host: '0.0.0.0',
      port: process.env.VITE_PORT,
    },
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: [
            // vuetify variable overrides
            '@import "@/assets/styles/variables"',
            '',
          ].join('\n'),
        },
      },
    },
  }); 
    
}

