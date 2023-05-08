import { supabaseAdmin } from "./supabase-admin";

export async function getContactsCount(user_id: string) {
	const { error, count } = await supabaseAdmin
		.from("contacts")
		.select("*", { count: "exact", head: true })
		.eq("user_id", user_id);

	if (error) {
		throw error;
	}

	if (!count) {
		return 0;
	}

	return count;
}
