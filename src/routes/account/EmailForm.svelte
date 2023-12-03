<script lang="ts">
	import EnvelopeIcon from "$lib/components/icons/EnvelopeIcon.svelte";
	import type { EmailSchema } from "$lib/schemas";
	import { Button,Label, Input } from "flowbite-svelte";

	import { superForm } from "sveltekit-superforms/client";
	
	export let data

	const { form, errors, enhance } = superForm(data);
</script>

<section class="px-6 pt-16">
	<div class="flex items-center font-semibold">
		<EnvelopeIcon />
		<span class="ml-4">Email Address</span>
	</div>
	<p class="mt-3 max-w-none text-sm">Change the email associated with your account</p>
	<!-- Email Address Form -->
	<form method="POST" action="?/updateEmail" use:enhance class="mt-8">
		<Label for="email" class="space-y-2">
			<span>Email</span>
			<Input type="email" name="email" bind:value={$form.email} />
			{#if $errors.email}
				<span class="block text-red-600 dark:text-red-500">{$errors.email}</span>
			{/if}
		</Label>
		<Button type="submit" class="mt-4">Update Email</Button>
	</form>
</section>
