import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getCustomerRecord } from "$lib/server/customers";
import { stripe } from "$lib/server/stripe";
import { ENV } from "$lib/server/env";
import { handleLoginRedirect } from "$lib/helpers";

export const GET: RequestHandler = async (event) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, handleLoginRedirect(event));
	}

	const customer = await getCustomerRecord(session.user.id);

	const portalSession = await stripe.billingPortal.sessions.create({
		customer: customer.id,
		return_url: `${ENV.PUBLIC_BASE_URL}/account`
	});

	if (!portalSession.url) {
		throw error(500, "Error retrieving billing information. We're working on it!");
	}

	throw redirect(302, portalSession.url);
};
