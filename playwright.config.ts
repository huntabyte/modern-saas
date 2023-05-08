import { PlaywrightTestConfig, devices } from "@playwright/test";
import { resolve } from "path";

const config: PlaywrightTestConfig = {
	webServer: {
		command: "pnpm build && pnpm preview",
		port: 4173,
		reuseExistingServer: true
	},
	testDir: "tests",
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] }
		}
	],
	globalSetup: resolve("tests/globalSetup.ts"),
	globalTeardown: resolve("tests/globalSetup.ts")
};

export default config;
