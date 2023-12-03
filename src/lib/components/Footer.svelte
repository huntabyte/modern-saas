<script>
  import { onMount } from 'svelte';
  import { fetchJSON } from '$lib/util';
  import NotEditable from '$lib/components/NotEditable.svelte';
  import logo from '$lib/img/delusso.png';
  import logo2 from '$lib/img/logoGold.png';
  const navigation = [
		{ label: "About", href: "/about" },
		{ label: "Home Valuation", href: "/valuation" },
		{ label: "Concierge Services", href: "/concierge" },
		{ label: "Properties", href: "/properties" },

	
	]; 
</script>

<NotEditable>
  <footer class="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
    <div class="mx-auto max-w-screen-xl text-center">
        <a href="/" class="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-64 mb-10" src={logo2} alt="">   
        </a>      
        <ul class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          {#each navigation as nav }
          <li>
            <a href={nav.href} class="mr-4 hover:underline md:mr-6 ">{nav.label}</a>
        </li>
          {/each}
            
      
        </ul>
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2021-2024 <a href="#" class="hover:underline">DiLusso™</a>. All Rights Reserved.</span>
    </div>
  </footer>
</NotEditable>
