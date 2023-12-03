<script lang="ts">
  import { isEditing } from '$lib/stores.js';

  export let content:string;
  export let multiLine = false;
</script>

{#if $isEditing}
  {#await import('./PlainTextEditor.svelte')}
    {@html content}
  {:then PlainTextEditor}
    <PlainTextEditor.default {multiLine} bind:content />
  {/await}
{:else}
  {@html content}
{/if}