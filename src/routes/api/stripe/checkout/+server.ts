import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { createCheckoutSession, getSubscriptionTier } from "$lib/server/subscriptions";
import { handleLoginRedirect } from "$lib/helpers";

export const GET: RequestHandler = async (event) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, handleLoginRedirect(event));
	}

	const tier = await getSubscriptionTier(session.user.id);

	if (tier !== "Free") {
		throw redirect(302, "/account/billing");
	}

	const price_id = event.url.searchParams.get("id");
	if (!price_id) {
		throw error(400, "Invalid request");
	}

	let checkoutUrl: string;

	try {
		checkoutUrl = await createCheckoutSession(session.user.id, price_id);
	} catch (e) {
		console.log(e);
		throw error(500, "An error occurred while creating the checkout session.");
	}

	throw redirect(302, checkoutUrl);
};
