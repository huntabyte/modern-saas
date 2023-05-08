<script lang="ts">
	import type { DeleteContactSchema } from "$lib/schemas";
	import { Button, Modal } from "flowbite-svelte";
	import toast from "svelte-french-toast";
	import { superForm } from "sveltekit-superforms/client";
	import type { Validation } from "sveltekit-superforms/index";
	export let open = false;

	export let data: Validation<DeleteContactSchema>;
	export let contactId: string;

	const { enhance } = superForm(data, {
		onResult: ({ result }) => {
			switch (result.type) {
				case "success":
					open = false;
					toast.success("Successfully deleted contact!");
					break;
				case "error":
					toast.error("Error deleting your contact.");
					break;
				case "failure":
					toast.error("Error deleting your contact.");
					break;
				default:
					return;
			}
			return;
		}
	});
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
			Are you sure you want to delete this contact?
		</h3>
		<div class="flex items-center justify-center">
			<form method="POST" action="?/deleteContact&id={contactId}" use:enhance>
				<Button type="submit" color="red" class="mr-2">Yes, I'm sure</Button>
			</form>
			<Button color="alternative">No, cancel</Button>
		</div>
	</div>
</Modal>
