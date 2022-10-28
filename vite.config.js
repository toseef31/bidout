import { createVuePlugin } from "vite-plugin-vue2";
import { defineConfig, loadEnv } from "vite";
import Components from "unplugin-vue-components/vite";
import { VuetifyResolver } from "unplugin-vue-components/resolvers";
import path from "path";

/**
 * @type {import('vite').UserConfig}
 */
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const env = loadEnv(mode, "env");
  const htmlPlugin = () => ({
    name: "html-transform",
    transformIndexHtml(html) {
      return html.replace(/%(.*?)%/g, (match, p1) => env[p1]);
    },
  });
  return defineConfig({
    resolve: {
      alias: [
        {
          find: "@/",
          replacement: `${path.resolve(__dirname, "./src")}/`,
        },
        {
          find: "src/",
          replacement: `${path.resolve(__dirname, "./src")}/`,
        },
      ],
    },
    plugins: [
      createVuePlugin(),
      Components({
        resolvers: [VuetifyResolver()],
      }),
      htmlPlugin(),
    ],
    server: {
      host: "0.0.0.0",
      port: process.env.VITE_PORT,
    },
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: [
            // vuetify variable overrides
            '@import "@/assets/styles/variables"',
            "",
          ].join("\n"),
        },
      },
    },
  });
};
