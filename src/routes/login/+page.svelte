<script lang="ts">
	import { Card, Button } from "flowbite-svelte";
</script>

<div class="py-20">
	<div class="flex w-full flex-col items-center">
		<!-- Login Page Header -->
		<div class="max-w-2xl text-center">
			<h1 class="text-4xl font-semibold">Login to your account</h1>
		</div>
		<Card class="mt-6 w-full" padding="xl" size="md">
			<!-- Login Form -->
			<form class="flex flex-col space-y-6">
				<label class="space-y-2" for="email">
					<span>Email</span>
					<input type="email" name="email" />
				</label>
				<label class="space-y-2" for="password">
					<span>Password</span>
					<input type="password" name="password" />
				</label>
				<Button type="submit" class="w-full">Login</Button>
				<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
					Don't have an account? <a
						href="/register"
						class="text-blue-700 hover:underline dark:text-blue-500">Sign up</a>
				</div>
			</form>
		</Card>
	</div>
</div>
