import vue from "@vitejs/plugin-vue";
import { babel } from "@rollup/plugin-babel";
/**
 * @type {import('vite').UserConfig}
 */
export default {
	plugins: [vue(), babel({ babelHelpers: "inline" })],
};
