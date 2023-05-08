import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { setError, superValidate } from "sveltekit-superforms/server";
import { emailSchema, passwordSchema, profileSchema } from "$lib/schemas";
import { getSubscriptionTier } from "$lib/server/subscriptions";

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, "/login");
	}

	async function getUserProfile() {
		const { error: profileError, data: profile } = await event.locals.supabase
			.from("profiles")
			.select("*")
			.limit(1)
			.single();

		if (profileError) {
			throw error(500, "Error retreiving your profile, please try again later.");
		}
		return profile;
	}

	return {
		profileForm: superValidate(await getUserProfile(), profileSchema, {
			id: "profile"
		}),
		emailForm: superValidate({ email: session.user.email }, emailSchema, {
			id: "email"
		}),
		passwordForm: superValidate(passwordSchema, {
			id: "password"
		}),
		tier: getSubscriptionTier(session.user.id)
	};
};

export const actions: Actions = {
	updateProfile: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, "Unauthorized");
		}

		const profileForm = await superValidate(event, profileSchema, {
			id: "profile"
		});

		if (!profileForm.valid) {
			return fail(400, {
				profileForm
			});
		}

		const { error: profileError } = await event.locals.supabase
			.from("profiles")
			.update(profileForm.data)
			.eq("id", session.user.id);

		if (profileError) {
			return setError(profileForm, null, "Error updating your profile.");
		}

		return {
			profileForm
		};
	},
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
