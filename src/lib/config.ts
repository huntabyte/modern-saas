export const lookupKeys = ["plus_monthly", "plus_yearly", "pro_monthly", "pro_yearly"] as const;

export const productNames = ["Free", "Plus", "Pro"] as const;
type ProductNames = (typeof productNames)[number];

type ProductConfig = Record<ProductNames, { features: string[]; call_to_action: string }>;

export const productConfig: ProductConfig = {
	Free: {
		features: [
			"✅ Up to 5 Contacts",
			"❌ Community Support",
			"❌ Automatic Backups",
			"❌ 24/7 Customer Support",
			"❌ SSO"
		],
		call_to_action: "Get Started"
	},
	Plus: {
		features: [
			"✅ Up to 25 Contacts",
			"✅ Community Support",
			"✅ Automatic Backups",
			"❌ 24/7 Customer Support",
			"❌ SSO"
		],
		call_to_action: "Start Free Trial"
	},
	Pro: {
		features: [
			"✅ Unlimited Contacts",
			"✅ Community Support",
			"✅ Automatic Backups",
			"✅ 24/7 Customer Support",
			"✅ SSO"
		],
		call_to_action: "Start Free Trial"
	}
};

export const freePrice = {
	id: "",
	unit_amount: 0,
	interval: "forever",
	product: {
		name: "Free",
		description: "For limited personal use",
		features: productConfig.Free.features,
		call_to_action: productConfig.Free.call_to_action
	}
};

export const tierPolicy = {
	maxContacts: {
		Free: 5,
		Plus: 25,
		Pro: Infinity
	}
} as const;
