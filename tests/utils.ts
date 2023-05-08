import { expect, type Page } from "@playwright/test";

type User = {
	full_name: string;
	email: string;
	password: string;
};

export async function registerUser(page: Page, testUser: User) {
	await page.goto("/");
	await page.getByRole("link", { name: "Register" }).click();
	await expect(page.getByRole("heading", { name: "Register" })).toBeVisible();

	const registerForm = page.getByTestId("register-form");
	await registerForm.getByTestId("full_name").fill(testUser.full_name);
	await registerForm.getByTestId("email").fill(testUser.email);
	await registerForm.getByTestId("password").fill(testUser.password);
	await registerForm.getByTestId("passwordConfirm").fill(testUser.password);
	await registerForm.getByRole("button", { name: "Register" }).click();

	await expect(page.getByRole("button", { name: "Account " })).toBeVisible();
}

export async function loginUser(page: Page, testUser: User) {
	await page.goto("/");
	await page.getByRole("link", { name: "Login" }).click();
	await expect(page.getByRole("heading", { name: "Login " })).toBeVisible();

	const loginForm = page.getByTestId("login-form");
	await loginForm.getByTestId("email").fill(testUser.email);
	await loginForm.getByTestId("password").fill(testUser.password);
	await loginForm.getByRole("button", { name: "Login" }).click();

	await expect(page).toHaveURL("/");
	await expect(page.getByRole("button", { name: "Account" })).toBeVisible();
}

export async function logoutUser(page: Page, testUser: User) {
	await loginUser(page, testUser);
	await page.goto("/");
	await page.getByRole("button", { name: "account" }).click();
	await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
	await page.getByRole("button", { name: "Sign out" }).click();
	await expect(page).toHaveURL("/login");
}
