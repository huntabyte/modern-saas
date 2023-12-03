import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { setError, superValidate } from "sveltekit-superforms/server";
import { emailSchema, passwordSchema, profileSchema } from "$lib/schemas";
// import {prisma} from "$lib/server/prisma"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, '/');
	}

return {
	
		emailForm: superValidate({ email: session.user.email }, emailSchema, {
			id: "email"
		}),
		passwordForm: superValidate(passwordSchema, {
			id: "password"
		}),
		
	};
};

export const actions: Actions = {
	  
	updateEmail: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, "Unauthorized");
		}

		const emailForm = await superValidate(event, emailSchema, {
			id: "email"
		});

		if (!emailForm.valid) {
			return fail(400, {
				emailForm
			});
		}

		const { error: emailError } = await event.locals.supabase.auth.updateUser({
			email: emailForm.data.email
		});

		if (emailError) {
			return setError(emailForm, "email", "Error updating your email.");
		}

		return {
			emailForm
		};
	},
	updatePassword: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, "Unauthorized");
		}

		const passwordForm = await superValidate(event, passwordSchema, {
			id: "password"
		});

		if (!passwordForm.valid) {
			return fail(400, {
				passwordForm
			});
		}

		if (passwordForm.data.password !== passwordForm.data.passwordConfirm) {
			return setError(passwordForm, "passwordConfirm", "Passwords must match");
		}

		const { error: passwordError } = await event.locals.supabase.auth.updateUser({
			password: passwordForm.data.password
		});

		if (passwordError) {
			return setError(passwordForm, null, "Error updating your password");
		}
		return {
			passwordForm
		};
	}
};
