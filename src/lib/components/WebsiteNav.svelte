<script>
  import { classNames } from '$lib/util';
  import Modal from './Modal.svelte';
  import NotEditable from './NotEditable.svelte';
  import Search from './Search.svelte';
  import { isEditing, currentUser } from '$lib/stores.js';
  import { page } from '$app/stores';
  $: activeUrl = $page.url.pathname;
  let activeClass = 'text-white bg-green-700 md:bg-transparent md:text-green-700 md:dark:text-white dark:bg-green-600 md:dark:bg-transparent';
  let nonActiveClass = 'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
import siteLogo from "$lib/img/delusso.png"
import { ArrowRightOutline } from 'flowbite-svelte-icons';
import gsap from 'gsap';
	import ScrollTrigger from 'gsap/dist/ScrollTrigger';

  const navigation = [
		{ label: "About", href: "/about" },
		{ label: "Home Valuation", href: "/valuation" },
		{ label: "Concierge Services", href: "/concierge" },
		{ label: "Properties", href: "/properties" },

	
	]; 
	import { onMount } from "svelte";
	import { invalidate } from "$app/navigation";
	import { Toaster } from "svelte-french-toast";
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
  import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { ChevronDownSolid } from 'flowbite-svelte-icons';


  // TODO: Replace with a globally managed context menu implementation (only one active)
  export let showUserMenu = undefined;
  export let showSearch = undefined; 

  function onKeyDown(e) {
    // Close modals
    if (e.key === 'Escape') {
      showSearch = false;
      showUserMenu = false;
    }
    // Trigger the search panel
    if (e.key === 'k' && e.metaKey) {
      showSearch = true;
    }
    // Turn on editing
    if (e.key === 'e' && e.metaKey) {
      $isEditing = true;
      console.log('Editing enabled');
    }
  }

  async function handleLogout() {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST', // or 'GET' depending on your server setup
        headers: {
          'Content-Type': 'application/json',
          // You might need to include additional headers, like authorization token
        },
      });

      if (response.ok) {
        // The logout was successful, handle accordingly
        console.log('Logout successful');
      } else {
        // Handle errors
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout', error);
    }
  }

  onMount(() => {
gsap.registerPlugin(ScrollTrigger);


  ScrollTrigger.create({
  start: 'top -96',
  end: 99999,
  toggleClass: {className: 'navsmaller', targets: '.mainNav'},
  
});
  });
</script>

    <NotEditable>
      <Navbar  class="fixed z-10 bg-transparent mainNav">
        <NavBrand href="/">
          <!-- <img src={siteLogo} class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
          <span class="logo self-center whitespace-nowrap text-xl font-semibold text-white">DI LUSSO</span>
        </NavBrand>
        <NavHamburger  />
        <NavUl >
          {#each navigation as nav }
          <NavLi href={nav.href} class="text-white navLi">{nav.label}</NavLi>
          {/each}
          
         
        </NavUl>
        {#if $currentUser}
        <Button class="">Dashboard<ChevronDownSolid class="w-3 h-3 ml-2 text-white dark:text-white bg-primary-700" /></Button>
        <Dropdown>
          <DropdownItem href="/account">Settings</DropdownItem>
          <DropdownItem>
            <button on:click={() => (showUserMenu = !showUserMenu)}>
              Edit Website
            </button>
          </DropdownItem>
          <form action="/logout" method="POST">
            <DropdownItem type="submit" slot="footer">Sign out</DropdownItem>
          </form>
        </Dropdown>
      {:else}
        <a href="/contact" class="tBtn2">
          Contact 
        </a>
      {/if}

      </Navbar>           
  
    </NotEditable>

<svelte:window on:keydown={onKeyDown} />


