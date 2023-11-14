<script lang="ts">
	import { Button } from "flowbite-svelte";
	import { useChat } from 'ai/svelte'

	const { messages, input,handleSubmit } = useChat();
</script>

<div class="py-20">
	<div class="mx-auto mb-10 max-w-2xl text-center">
		<h1 class="mb-6 text-5xl sm:text-6xl">The Next-Gen Contact Management App</h1>
		<p class="text-lg">
			Revolutionize your communication game with Contactly - the ultimate solution for streamlined
			and organized contact management.
		</p>
	</div>
	<div class="flex items-center justify-center gap-3">
		<Button href="/pricing" size="lg">Get Started</Button>
		<Button href="/pricing" color="light" size="lg">Learn More</Button>
	</div>

	<section class="text-center mt-16">
		<h2 class="mb-5">Use Chat</h2>
		<ul>
			{#each $messages as m}
				<li>  {m.role === 'user' ? 'User: ' : 'AI: '}: {m.content}</li>
			{/each}
		</ul>
		<form on:submit={handleSubmit} class="flex">
			<input class="border border-lime-700" type="text" name="email" bind:value={$input} data-testid="email" />

			<Button class="bg-lime-700 px-3 -ms-2" type="submit">Send</Button>
		</form>
	</section>
</div>
<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>