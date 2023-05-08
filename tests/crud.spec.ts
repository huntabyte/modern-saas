import { expect, test } from "@playwright/test";
import { loginUser, registerUser } from "./utils.js";

const crudUser = {
	full_name: "Test User2",
	email: "test2@example.com",
	password: "password"
};

const testContact = {
	name: "Jimbo Jones",
	email: "jimmy@example.com",
	phone: "555-555-5555",
	company: "Trucks Inc."
};

test("user can create and read a contact", async ({ page }) => {
	await page.goto("/");
	await registerUser(page, crudUser);
	await page.goto("/");
	await page.getByRole("link", { name: "contacts" }).click();
	await expect(page).toHaveURL("/contacts");

	await page.getByRole("button", { name: "new contact" }).click();
	const contactForm = page.getByTestId("create-contact-form");

	await contactForm.getByTestId("name").fill(testContact.name);
	await contactForm.getByTestId("email").fill(testContact.email);
	await contactForm.getByTestId("phone").fill(testContact.phone);
	await contactForm.getByTestId("company").fill(testContact.company);
	await contactForm.getByRole("button", { name: "Create contact" }).click();
	await expect(contactForm).not.toBeVisible();

	await expect(page.getByRole("table").filter({ hasText: testContact.name })).toBeVisible();
});

test("user can update a contact", async ({ page }) => {
	await loginUser(page, crudUser);
	await page.goto("/");
	await page.getByRole("link", { name: "contacts" }).click();
	await expect(page).toHaveURL("/contacts");

	await page
		.getByRole("table")
		.filter({ hasText: testContact.name })
		.getByRole("button", { name: "Contact Menu" })
		.click();
	await expect(page.getByRole("link", { name: "Edit" })).toBeVisible();
	await page.getByRole("link", { name: "Edit" }).click();
	await expect(page.getByRole("heading", { name: "Edit" })).toBeVisible();
	const editContactForm = page.getByTestId("edit-contact-form");

	await expect(editContactForm.getByTestId("name")).toHaveValue(testContact.name);
	await expect(editContactForm.getByTestId("email")).toHaveValue(testContact.email);
	await expect(editContactForm.getByTestId("company")).toHaveValue(testContact.company);
	await expect(editContactForm.getByTestId("phone")).toHaveValue(testContact.phone);

	await editContactForm.getByTestId("name").fill("Bob Jones");
	await editContactForm.getByRole("button", { name: "Save Changes" }).click();

	await page.goto("/contacts");
	await expect(page.getByRole("table").filter({ hasText: "Bob Jones" })).toBeVisible();
});

test("user can delete a contact", async ({ page }) => {
	await loginUser(page, crudUser);
	await page.goto("/");
	await page.getByRole("link", { name: "contacts" }).click();
	await expect(page).toHaveURL("/contacts");

	await page
		.getByRole("table")
		.filter({ hasText: testContact.email })
		.getByRole("button", { name: "Contact Menu" })
		.click();

	await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();
	await page.getByRole("button", { name: "Delete" }).click();

	await expect(page.getByRole("heading", { level: 3, name: "Are you sure" })).toBeVisible();
	await page.getByRole("button", { name: "Yes," }).click();

	await expect(page.getByRole("table").filter({ hasText: testContact.email })).not.toBeVisible();
});
