<script lang="ts">
	import {
		Button,
		Dropdown,
		DropdownItem,
		MenuButton,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from "flowbite-svelte";
	import type { PageData } from "./$types";
	import CreateContactModal from "./CreateContactModal.svelte";

	export let data: PageData;
	let createContactOpen = false;
</script>

<div class="py-20">
	<!-- Contacts Page Header -->
	<div class="flex w-full items-center justify-between pb-6">
		<h1 class="text-3xl">Contacts</h1>
		<Button size="sm" on:click={() => (createContactOpen = true)}>New Contact</Button>
	</div>
	<!-- Contacts Table -->
	<Table shadow divClass="min-h-full">
		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Email</TableHeadCell>
			<TableHeadCell>Phone</TableHeadCell>
			<TableHeadCell>Company</TableHeadCell>
			<TableHeadCell />
		</TableHead>
		<TableBody>
			{#each data.contacts as contact, _i (contact.id)}
				<TableBodyRow>
					<TableBodyCell>{contact.name ?? "--"}</TableBodyCell>
					<TableBodyCell>{contact.email ?? "--"}</TableBodyCell>
					<TableBodyCell>{contact.phone ?? "--"}</TableBodyCell>
					<TableBodyCell>{contact.company ?? "--"}</TableBodyCell>
					<TableBodyCell>
						<MenuButton class="dots-menu dark:text-white" vertical name="Contact Menu" />
						<Dropdown placement="left-start">
							<DropdownItem>Edit</DropdownItem>
							<DropdownItem slot="footer">Delete</DropdownItem>
						</Dropdown>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
<CreateContactModal bind:open={createContactOpen} data={data.createContactForm} />
