<script lang="ts">
	import { Button, ButtonGroup, Card } from "flowbite-svelte";

	import type { PageData } from "./$types";
	export let data: PageData;

	$: ({ prices, interval } = data);
</script>

<div class="py-20">
	<!-- Pricing Page Header -->
	<div class="mx-auto mb-10 max-w-2xl text-center">
		<h1 class="mb-2 text-base font-semibold text-sky-500 dark:text-sky-400">Pricing</h1>
		<p class="mb-6 text-5xl font-bold">Choose what works for you</p>
		<p class="text-lg">
			Contactly offers flexible pricing plans to cater to the unique needs of your business. Choose
			from our range of affordable options and get started today
		</p>
	</div>
	<div class="flex justify-center">
		<ButtonGroup>
			<Button color="blue" outline={interval !== "month"} href="/pricing">Monthly</Button>
			<Button color="blue" outline={interval !== "year"} href="/pricing?interval=year"
				>Yearly</Button>
		</ButtonGroup>
	</div>
	<!-- Pricing Card Grid -->
	<div
		class="isolate mx-auto mt-10 grid max-w-6xl grid-cols-1 justify-items-center gap-8 lg:grid-cols-3">
		{#each prices as price, _i (price.id)}
			<!-- Pricing Card -->
			<Card padding="xl" class="w-full">
				<h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
					{price.product.name}
				</h5>
				<div class="flex items-baseline text-gray-900 dark:text-white">
					<span class="text-3xl font-semibold">$</span>
					<span class="text-5xl font-extrabold tracking-tight">{price.unit_amount}</span>
					<span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400"
						>/{price.unit_amount > 0 ? interval : "forever"}</span>
				</div>
				<ul class="my-7 space-y-6">
					{#each price.product.features as feature}
						<li class="flex space-x-2">
							<span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
								>{feature}</span>
						</li>
					{/each}
				</ul>
				<Button class="w-full">{price.product.call_to_action}</Button>
			</Card>
		{/each}
	</div>
</div>
