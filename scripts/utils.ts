import detect from "detect-port";
import { execSync } from "child_process";
import pg from "pg";
import { ENV } from "$lib/server/env";
import type { z } from "zod";
import type { registerUserSchema } from "$lib/schemas";
import { supabaseAdmin } from "$lib/server/supabase-admin";
import { faker } from "@faker-js/faker";

export async function startSupabase() {
	const port = await detect(54322);

	if (port !== 54322) {
		return;
	}
	execSync("pnpx supabase start");
}

export async function clearSupabaseData() {
	const client = new pg.Client({
		connectionString: ENV.SUPABASE_DB_URL
	});
	await client.connect();
	await client.query("TRUNCATE auth.users CASCADE");
}

type CreateUser = Omit<z.infer<typeof registerUserSchema>, "passwordConfirm">;

export async function createUser(user: CreateUser) {
	const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
		email: user.email,
		password: user.password,
		options: {
			data: {
				full_name: user.full_name ?? "Test User"
			}
		}
	});

	if (authError || !authData.user) {
		throw new Error("Error creating user");
	}
	return authData.user;
}

export async function createContact(user_id: string) {
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();
	const contact = {
		name: `${firstName} ${lastName}`,
		email: faker.internet.exampleEmail(firstName, lastName),
		company: faker.company.name(),
		phone: faker.phone.number(),
		user_id
	};

	const { error, data } = await supabaseAdmin.from("contacts").insert(contact);

	if (error) {
		throw error;
	}

	return data;
}
