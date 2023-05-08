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
	import DeleteContactModal from "./DeleteContactModal.svelte";
	import { hasReachedMaxContacts } from "$lib/helpers";
	import UpgradePlanModal from "$lib/components/UpgradePlanModal.svelte";

	export let data: PageData;
	let createContactOpen = false;
	let deleteContactOpen = false;
	let contactToDelete: string;
	let upgradeModalOpen = false;

	function handleContactDelete(contact_id: string) {
		contactToDelete = contact_id;
		deleteContactOpen = true;
	}

	$: ({ contactsCount, tier } = data);
	$: reachedMaxContacts = hasReachedMaxContacts(tier, contactsCount);

	function handleContactCreate() {
		if (reachedMaxContacts) {
			upgradeModalOpen = true;
			return;
		}
		createContactOpen = true;
	}
</script>

<div class="py-20">
	<!-- Contacts Page Header -->
	<div class="flex w-full items-center justify-between pb-6">
		<h1 class="text-3xl">Contacts</h1>
		<Button size="sm" on:click={handleContactCreate}>New Contact</Button>
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
							<DropdownItem href="/contacts/{contact.id}">Edit</DropdownItem>
							<DropdownItem slot="footer" on:click={() => handleContactDelete(contact.id)}
								>Delete</DropdownItem>
						</Dropdown>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
<CreateContactModal bind:open={createContactOpen} data={data.createContactForm} />
<DeleteContactModal
	bind:open={deleteContactOpen}
	contactId={contactToDelete}
	data={data.deleteContactForm} />
<UpgradePlanModal
	bind:open={upgradeModalOpen}
	{tier}
	message="You have reached the max contacts for your plan. Upgrade to add more contacts." />
