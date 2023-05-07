<script lang="ts">
	import { EnvelopeIcon, LockIcon, RocketIcon, UserIcon } from "$lib/components/icons";
	import { Button } from "flowbite-svelte";
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
		<!-- Current Plan & Billing Section -->
		<section class="px-6">
			<div class="flex items-center font-semibold">
				<RocketIcon />
				<span class="ml-4">Current Plan & Billing</span>
			</div>
			<p class="mt-3 max-w-none text-sm">Manage your current plan and billing details</p>
			<div class="mt-8">
				<div>
					Current Plan: <strong>Free</strong>
				</div>
				<Button class="mt-4">Manage Billing</Button>
			</div>
		</section>
		<!-- Profile Section -->
		<section class="px-6 pt-16">
			<div class="flex items-center font-semibold">
				<UserIcon />
				<span class="ml-4">Personal Details</span>
			</div>
			<p class="mt-3 text-sm">Change the personal details associated with your account</p>
			<!-- Personal Details Form -->
			<form class="mt-8">
				<label for="full_name" class="space-y-2">
					<span>Name</span>
					<input type="text" name="full_name" />
				</label>
				<Button type="submit" class="mt-4">Update Details</Button>
			</form>
		</section>
		<!-- Email Address Section -->
		<section class="px-6 pt-16">
			<div class="flex items-center font-semibold">
				<EnvelopeIcon />
				<span class="ml-4">Email Address</span>
			</div>
			<p class="mt-3 max-w-none text-sm">Change the email associated with your account</p>
			<!-- Email Address Form -->
			<form class="mt-8">
				<label for="email" class="space-y-2">
					<span>Email</span>
					<input type="email" name="email" />
				</label>
				<Button type="submit" class="mt-4">Update Email</Button>
			</form>
		</section>
		<!-- Change Password Section -->
		<section class="px-6 pt-16">
			<div class="flex items-center font-semibold">
				<LockIcon />
				<span class="ml-4">Password</span>
			</div>
			<p class="mt-3 max-w-none text-sm">Change the password associated with your account</p>
			<!-- Change Password Form -->
			<form class="mt-8 flex flex-col space-y-4">
				<label for="password" class="space-y-2">
					<span>New Password</span>
					<input type="password" name="password" />
				</label>
				<label for="passwordConfirm" class="space-y-2">
					<span>Confirm New Password</span>
					<input type="password" name="passwordConfirm" />
				</label>
				<Button type="submit" class="mt-4 self-start">Change Password</Button>
			</form>
		</section>
	</div>
</div>
