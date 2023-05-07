import { z } from "zod";
import { setError, superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { AuthApiError } from "@supabase/supabase-js";

const loginUserSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(1, "Please enter a password")
});

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (session) {
		throw redirect(302, "/");
	}
	return {
		form: superValidate(loginUserSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, loginUserSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { error: authError } = await event.locals.supabase.auth.signInWithPassword(form.data);

		if (authError) {
			if (authError instanceof AuthApiError && authError.status === 400) {
				setError(form, "email", "Invalid credentials");
				setError(form, "password", "Invalid credentials");
				return fail(400, {
					form
				});
			}
		}

		throw redirect(302, "/");
	}
};
