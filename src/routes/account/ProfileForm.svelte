<script lang="ts">
	import UserIcon from "$lib/components/icons/UserIcon.svelte";
	import type { ProfileSchema } from "$lib/schemas";
	import { Button,Label, Input } from "flowbite-svelte";


	import { superForm } from "sveltekit-superforms/client";
	
	export let data

	const { form, errors, enhance } = superForm(data);
</script>

<section class="px-6 pt-16">
	<div class="flex items-center font-semibold">
		<UserIcon />
		<span class="ml-4">Personal Details</span>
	</div>
	<p class="mt-3 text-sm">Change the personal details associated with your account</p>
	<!-- Personal Details Form -->
	<form method="POST" action="?/updateProfile" use:enhance class="mt-8">
		<Label for="full_name" class="space-y-2">
			<span>Name</span>
			<Input type="text" name="full_name" bind:value={$form.full_name} />
			{#if $errors.full_name}
				<span class="block text-red-600 dark:text-red-500">{$errors.full_name}</span>
			{/if}
		</Label>
		<Button type="submit" class="mt-4">Update Details</Button>
	</form>
</section>
