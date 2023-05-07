import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { setError, superValidate } from "sveltekit-superforms/server";
import { createContactSchema, deleteContactSchema } from "$lib/schemas";
import { supabaseAdmin } from "$lib/server/supabase-admin";

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, "/login");
	}

	async function getContacts() {
		const { data: contacts, error: contactsError } = await event.locals.supabase
			.from("contacts")
			.select("*")
			.limit(10);

		if (contactsError) {
			throw error(500, "Error fetching contacts, please try again later.");
		}
		return contacts;
	}
	return {
		createContactForm: superValidate(createContactSchema, {
			id: "create"
		}),
		contacts: getContacts(),
		deleteContactForm: superValidate(deleteContactSchema, {
			id: "delete"
		})
	};
};

export const actions: Actions = {
	createContact: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, "Unauthorized");
		}

		const createContactForm = await superValidate(event, createContactSchema, {
			id: "create"
		});

		if (!createContactForm.valid) {
			return fail(400, {
				createContactForm
			});
		}

		const { error: createContactError } = await supabaseAdmin.from("contacts").insert({
			...createContactForm.data,
			user_id: session.user.id
		});

		if (createContactError) {
			console.log(createContactError);
			return setError(createContactForm, null, "Error creating contact.");
		}

		return {
			createContactForm
		};
	},
	deleteContact: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, "Unauthorized");
		}

		const deleteContactForm = await superValidate(event.url, deleteContactSchema, {
			id: "delete"
		});

		if (!deleteContactForm.valid) {
			return fail(400, {
				deleteContactForm
			});
		}

		const { error: deleteContactError } = await event.locals.supabase
			.from("contacts")
			.delete()
			.eq("id", deleteContactForm.data.id);

		if (deleteContactError) {
			return setError(deleteContactForm, null, "Error deleting contact");
		}

		return {
			deleteContactForm
		};
	}
};
