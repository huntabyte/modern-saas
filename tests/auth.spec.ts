import { expect, test } from "@playwright/test";
import { loginUser, logoutUser, registerUser } from "./utils.js";

const testUser = {
	full_name: "Test User",
	email: "test@example.com",
	password: "password"
};

test("user can register for an account", async ({ page }) => {
	await registerUser(page, testUser);
});

test("user can login to their account", async ({ page }) => {
	await loginUser(page, testUser);
});

test("user can logout of an account", async ({ page }) => {
	await logoutUser(page, testUser);
});
