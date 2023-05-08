import { tierPolicy } from "./config";
import type { SubscriptionTier } from "./schemas";

export function hasReachedMaxContacts(tier: SubscriptionTier, contactsCount: number) {
	return contactsCount >= tierPolicy["maxContacts"][tier];
}

export function getUpgradeURL(tier: SubscriptionTier) {
	return tier === "Free" ? "/pricing" : "/account/billing";
}
