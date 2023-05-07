import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
	webServer: {
		command: "pnpm build && pnpm preview",
		port: 4173,
		reuseExistingServer: true
	},
	testDir: "tests",
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
