import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
	alias: {
		$lib: "./src/lib"
	  }
  },
  preprocess: [vitePreprocess({})]
};
export default config;