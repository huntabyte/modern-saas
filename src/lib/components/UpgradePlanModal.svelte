<script lang="ts">
	import type { SubscriptionTier } from "$lib/schemas";
	import { getUpgradeURL } from "$lib/helpers";

	import { Button, Modal } from "flowbite-svelte";
	export let open = false;
	export let tier: SubscriptionTier;
	export let message: string = "You must upgrade your plan to access this feature";
</script>

<Modal bind:open size="xs" autoclose={false}>
	<div class="text-center">
		<svg
			aria-hidden="true"
			class="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			{message}
		</h3>
		<div class="flex items-center justify-center">
			<Button class="mr-2" href={getUpgradeURL(tier)}>Upgrade</Button>
			<Button color="light" on:click={() => (open = false)}>Nevermind</Button>
		</div>
	</div>
</Modal>
