<script lang="ts">
	import { Button, Card } from "flowbite-svelte";
	import type { PageData } from "./$types";
	import { superForm } from "sveltekit-superforms/client";
	import toast from "svelte-french-toast";
	export let data: PageData;

	const { form, errors, enhance } = superForm(data.updateContactForm, {
		onResult: ({ result }) => {
			switch (result.type) {
				case "success":
					toast.success("Successfully updated contact!");
					break;
				case "error":
					toast.error("Error updating your contact.");
					break;
				case "failure":
					toast.error("Validation error, check the details and try again.");
					break;
				default:
					return;
			}
			return;
		}
	});
</script>

<div class="py-20">
	<div class="flex w-full flex-col items-center">
		<div class="max-w-2xl text-center">
			<h1 class="text-4xl font-semibold">Edit Contact</h1>
		</div>
		<Card class="mt-6 w-full" padding="xl" size="md">
			<form
				method="POST"
				action="?/updateContact"
				class="flex flex-col space-y-6"
				use:enhance
				data-testid="edit-contact-form">
				<label class="space-y-2" for="name">
					<span>Name</span>
					<input type="text" name="name" bind:value={$form.name} data-testid="name" />
					{#if $errors.name}
						<span class="block text-red-600 dark:text-red-500">{$errors.name}</span>
					{/if}
				</label>
				<label class="space-y-2" for="email">
					<span>Email</span>
					<input type="email" name="email" bind:value={$form.email} data-testid="email" />
					{#if $errors.email}
						<span class="block text-red-600 dark:text-red-500">{$errors.email}</span>
					{/if}
				</label>
				<label class="space-y-2" for="phone">
					<span>Phone</span>
					<input type="text" name="phone" bind:value={$form.phone} data-testid="phone" />
					{#if $errors.phone}
						<span class="block text-red-600 dark:text-red-500">{$errors.phone}</span>
					{/if}
				</label>
				<label class="space-y-2" for="company">
					<span>Company</span>
					<input type="text" name="company" bind:value={$form.company} data-testid="company" />
					{#if $errors.company}
						<span class="block text-red-600 dark:text-red-500">{$errors.company}</span>
					{/if}
				</label>
				<Button type="submit" class="w-full">Save Changes</Button>
			</form>
		</Card>
	</div>
</div>
