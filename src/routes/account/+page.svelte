<script lang="ts">
	import { RocketIcon } from "$lib/components/icons";
	import { Button,Label, Input } from "flowbite-svelte";

	import type { PageData } from "./$types";
	import ProfileForm from "./ProfileForm.svelte";
	import EmailForm from "./EmailForm.svelte";
	import PasswordForm from "./PasswordForm.svelte";

	export let data: PageData;
</script>

<div class="py-20">
	<!-- Account Page Header -->
	<div class="mx-auto flex max-w-2xl flex-col items-center pb-20 text-center">
		<span class="mt-2 text-5xl font-bold">Account Settings</span>
		<span class="text-neutral-content mt-4 text-center text-lg leading-8">
			Manage your email, password, billing, and other account details.
		</span>
	</div>
	<div
		class="divide-surface-700 mx-auto max-w-xl space-y-16 divide-y divide-gray-300 dark:divide-gray-700">
	
		<!-- Profile Section -->
		<!-- <ProfileForm data={data.profileForm} /> -->
		<!-- Email Address Section -->
		<EmailForm data={data.emailForm} />
		<!-- Change Password Section -->
		<PasswordForm data={data.passwordForm} />
	</div>
</div>
