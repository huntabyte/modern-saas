const config = {
	content: [
		"./src/**/*.{html,js,svelte,ts}",
		"./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"
	],

	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "sans-serif", "system-ui"]
			}
		}
	},

	plugins: [require("flowbite/plugin")],
	darkMode: "media"
};

module.exports = config;
