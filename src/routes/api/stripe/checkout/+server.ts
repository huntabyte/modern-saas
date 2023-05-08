import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getCustomerRecord } from "$lib/server/customers";
import { stripe } from "$lib/server/stripe";
import { ENV } from "$lib/server/env";

export const GET: RequestHandler = async (event) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, "/login");
	}

	const price_id = event.url.searchParams.get("id");
	if (!price_id) {
		throw error(400, "Invalid request");
	}

	let checkoutUrl: string;

	try {
		const customer = await getCustomerRecord(session.user.id);
		const price = await stripe.prices.retrieve(price_id);

		if (!price) {
			throw new Error("Invalid price id");
		}

		const checkoutSession = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "subscription",
			customer: customer.id,
			line_items: [
				{
					price: price.id,
					quantity: 1
				}
			],
			success_url: `${ENV.PUBLIC_BASE_URL}/account`,
			cancel_url: `${ENV.PUBLIC_BASE_URL}/pricing`,
			subscription_data: {
				metadata: {
					user_id: session.user.id
				},
				trial_period_days: 14,
				trial_settings: {
					end_behavior: {
						missing_payment_method: "cancel"
					}
				}
			},
			payment_method_collection: "if_required"
		});

		if (!checkoutSession.url) {
			throw new Error("Error creating checkout session");
		}
		checkoutUrl = checkoutSession.url;
	} catch (e) {
		console.log(e);
		throw error(500, "An error occurred while creating the checkout session.");
	}

	throw redirect(302, checkoutUrl);
};
