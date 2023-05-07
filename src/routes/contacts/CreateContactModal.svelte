<script lang="ts">
	import type { CreateContactSchema } from "$lib/schemas";
	import { Button, Modal } from "flowbite-svelte";
	import { superForm } from "sveltekit-superforms/client";
	import type { Validation } from "sveltekit-superforms/index";

	export let data: Validation<CreateContactSchema>;
	export let open = false;

	const { form, errors, enhance } = superForm(data, {
		resetForm: true,
		onResult: ({ result }) => {
			if (result.type === "success") {
				open = false;
				return;
			}
		}
	});
</script>

<Modal bind:open size="xs" autoclose={false} class="w-full">
	<form method="POST" action="?/createContact" class="flex flex-col space-y-6" use:enhance>
		<h3 class="text-xl font-medium">Create a Contact</h3>
		{#if $errors._errors}
			<span class="block text-red-600 dark:text-red-500">{$errors._errors}</span>
		{/if}
		<label class="space-y-2" for="name">
			<span>Name</span>
			<input type="text" name="name" bind:value={$form.name} />
			{#if $errors.name}
				<span class="block text-red-600 dark:text-red-500">{$errors.name}</span>
			{/if}
		</label>
		<label class="space-y-2" for="email">
			<span>Email</span>
			<input type="email" name="email" bind:value={$form.email} />
			{#if $errors.email}
				<span class="block text-red-600 dark:text-red-500">{$errors.email}</span>
			{/if}
		</label>
		<label class="space-y-2" for="phone">
			<span>Phone</span>
			<input type="text" name="phone" bind:value={$form.phone} />
			{#if $errors.phone}
				<span class="block text-red-600 dark:text-red-500">{$errors.phone}</span>
			{/if}
		</label>
		<label class="space-y-2" for="company">
			<span>Company</span>
			<input type="text" name="company" bind:value={$form.company} />
			{#if $errors.company}
				<span class="block text-red-600 dark:text-red-500">{$errors.company}</span>
			{/if}
		</label>
		<Button type="submit" class="w-full">Create Contact</Button>
	</form>
</Modal>
