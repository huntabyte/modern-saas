<script lang="ts">
  //@ts-ignore
  import PlainText from '$lib/components/PlainText.svelte';
  import RichText from '$lib/components/RichText.svelte';
  import { fetchJSON } from '$lib/util';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';
  import SecondaryButton from '$lib/components/SecondaryButton.svelte';
  import LoginMenu from '$lib/components/LoginMenu.svelte';
  import ArticleTeaser from '$lib/components/ArticleTeaser.svelte';
  import Testimonial from '$lib/components/Testimonial.svelte';
  import IntroStep from '$lib/components/IntroStep.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import bannerImage from '$lib/img/hero4.jpeg';
  import homeStats from '$lib/img/homeStats.jpg';
  import box1 from '$lib/img/box1.png';
  import box2 from '$lib/img/box2.png';
  import box3 from '$lib/img/box3.png';
  import homeCta from '$lib/img/home-cta.webp';
  import rendering from '$lib/img/building-vector.svg';
  import homeContactBg from '$lib/img/homeContact.jpg';
  import NotEditable from '$lib/components/NotEditable.svelte';
  import { currentUser, isEditing } from '$lib/stores.js';
  import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';
  import { Card, Button, Toggle } from 'flowbite-svelte';
  export let data;
  import { GiftBoxSolid, ArrowUpRightFromSquareOutline,ShieldCheckOutline,ScaleBalancedOutline,ZoomInOutline } from 'flowbite-svelte-icons';
  // --------------------------------------------------------------------------
  // DEFAULT PAGE CONTENT - AJDUST TO YOUR NEEDS
  // --------------------------------------------------------------------------
  const EMAIL = 'michael@letsken.com';

  // Can contain spaces but must not contain the + sign
  const PHONE_NUMBER = '43 664 1533015';

  const FAQS_PLACEHOLDER = `
		<h2>Question 1</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mi lectus, pellentesque nec urna eget, pretium dictum arcu. In rutrum pretium leo, id efficitur nisl ullamcorper sit amet.</p>
    <h2>Question 2</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mi lectus, pellentesque nec urna eget, pretium dictum arcu. In rutrum pretium leo, id efficitur nisl ullamcorper sit amet.</p>
	`;

  const BIO_PLACEHOLDER = `
		<p>Modern tools, such as Svelte and Tailwind allow you to easily hand-craft fast and beautiful websites. What’s missing is the ability to <strong>make edits without changing the source code</strong>.</p>
		<p>With this <a href="https://github.com/michael/editable-website">open-source website template</a>, I want to fill that gap.</p>
    <p>If you have questions or need any help, contact me.</p>
	`;

  const TESTIMONIALS_PLACEHOLDER = [
    {
      text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mi lectus, pellentesque nec urna eget, pretium dictum arcu. In rutrum pretium leo, id efficitur nisl ullamcorper sit amet.”',
      image: '/images/person-placeholder.jpg',
      name: 'Jane Doe · jane-doe.org'
    }
  ];

    let title,
    aboutUs,
    testimonials,
    faqs,
    introStep1,
    introStep2,
    introStep3,
    introStep4,
    bioTitle,
    bioPicture,
    bio,
    showUserMenu;

  function initOrReset() {
    $currentUser = data.currentUser;
    title = data.page?.title || 'We do it smart,';
    aboutUs = data.page?.aboutUs || 'Lorem Ipsum';
    faqs = data.page?.faqs || FAQS_PLACEHOLDER;

    // Make a deep copy
    testimonials = JSON.parse(JSON.stringify(data.page?.testimonials || TESTIMONIALS_PLACEHOLDER));

    introStep1 = JSON.parse(
      JSON.stringify(
        data.page?.introStep1 || {
          label: 'THE PROBLEM',
          title: 'The problem statement',
          description: 'Describe the problem you are solving in a short sentence.'
        }
      )
    );
    introStep2 = JSON.parse(
      JSON.stringify(
        data.page?.introStep2 || {
          label: 'THE DREAM',
          title: 'This is how it should be.',
          description: 'Describe why it should be like that.'
        }
      )
    );
    introStep3 = JSON.parse(
      JSON.stringify(
        data.page?.introStep3 || {
          label: 'THE REALITY',
          title: 'A statement why it is not that easy.',
          description: 'Describe the reality a bit more.'
        }
      )
    );
    introStep4 = JSON.parse(
      JSON.stringify(
        data.page?.introStep4 || {
          label: 'THE PROMISE',
          title: 'Still the solution is worth it.',
          description: 'And why this is, should be described here.'
        }
      )
    );
    bioPicture = data.page?.bioPicture || '/images/person-placeholder.jpg';
    bioTitle = data.page?.bioTitle || "Hi, I'm Michael — I want your website to be editable.";
    bio = data.page?.bio || BIO_PLACEHOLDER;
    $isEditing = false;
  }

  // --------------------------------------------------------------------------
  // Page logic
  // --------------------------------------------------------------------------

  function toggleEdit() {
    $isEditing = true;
    showUserMenu = false;
  }

  function addTestimonial() {
    testimonials.push({
      text: '“Add a quote text here”',
      image: '/images/person-placeholder.jpg',
      name: 'Firstname Lastname · example.com'
    });
    testimonials = testimonials; // trigger update
  }

  function deleteTestimonial(index) {
    testimonials.splice(index, 1);
    testimonials = testimonials; // trigger update
  }

  function moveTestimonial(index, direction) {
    let toIndex;
    if (direction === 'up' && index > 0) {
      toIndex = index - 1;
    } else if (direction === 'down' && index < testimonials.length - 1) {
      toIndex = index + 1;
    } else {
      return; // operation not possible
    }
    // Remove item from original position
    const element = testimonials.splice(index, 1)[0];
    // Insert at new position
    testimonials.splice(toIndex, 0, element);
    testimonials = testimonials; // trigger update
  }

  async function savePage() {
    try {
      // Only persist the start page when logged in as an admin
      if ($currentUser) {
        await fetchJSON('POST', '/api/save-page', {
          pageId: 'home',
          page: {
            title,
            aboutUs,
            faqs,
            testimonials,
            introStep1,
            introStep2,
            introStep3,
            introStep4,
            bioPicture,
            bioTitle,
            bio
          }
        });
      }
      $isEditing = false;
    } catch (err) {
      console.error(err);
      alert('There was an error. Please try again.');
    }
  }

  initOrReset();
  import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { onMount } from "svelte";

  import { register } from 'swiper/element/bundle';

  import { Navigation, Pagination } from 'swiper/modules';

onMount(() => {

  register();
  

  const swiperEl = document.querySelector('swiper-container');

// swiper parameters
const swiperParams = {
   modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 30,
  
  navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1199: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 4,
    },
  },
  on: {
    init() {
      // ...
    },
  },
};

// now we need to assign all parameters to Swiper element
Object.assign(swiperEl, swiperParams);

// and now initialize it
swiperEl.initialize();
  
  });

</script>

<svelte:head>
  <title>Di Lusso Real Estate</title>
  <meta name="description" content="Make changes to your website while browsing it." />
  <link rel="alternate" hreflang="en" href="https://editable.website" />
  <link rel="canonical" href="https://editable.website" />
</svelte:head>

<WebsiteHeader bind:showUserMenu on:cancel={initOrReset} on:save={savePage}>
  <PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
  <LoginMenu />
</WebsiteHeader>

<div class="container-fluid heroSection p-0 flex items-center" style="background: url({bannerImage}) top center no-repeat; background-size: cover;background-attachment: fixed;">
  <div class="container mx-auto">
  <div class="heroText relative mt-10 flex flex-col items-start">
  <h2 class="max-w-xl">
   <PlainText bind:content={title} />
   </h2>
    <p>Ohio Concierge Realty Group</p>
    
    <a href="home-valuation.html" class="tBtn2">Search Homes 
    </a>
  </div>
  
</div>

</div>
<!-- End Hero Section -->

<main id="main" data-scroll-container>
  <!-- ======= About Us Section ======= -->

  <div class="container-fluid aboutUs" style="background: url({rendering}) top right no-repeat; background-size: contain;">   
    <div class="container mx-auto grid grid-cols-3 pt-16 md:pt-28" >   
    <div class="aboutText col-span-3 md:col-span-2">
      <h2 class="small-title">We do it smart</h2>
      <RichText multiLine bind:content={aboutUs} />
      
    <a href="/about" class="tBtn2 tBtn2Alt  mt-8 md:mt-14">Learn More</a>
    
    </div>
  </div>
</div>
  <div class="container-fluid ohioSlider homeSlider listingsSec img-100 pt-16 md:pt-28" >
    <div class="container mx-auto">
      <div class="aboutSlideHeader">
        <h2 class="small-title swiperTitle">Featured Properties</h2>
        <!-- <h3>Ohio Concierge Realty Group</h3> -->
      </div>
      <swiper-container  init="false">    
        <div slot="container-start" class="navWrapper">
          <div class="swiper-button-next">
            <i class="fa-solid fa-arrow-right"></i>
   
           </div>
           <div class="swiper-button-prev">
             <i class="fa-solid fa-arrow-left"></i>
           </div>
        </div>  
          <swiper-slide>
            <div class="listingsBox">
              <div class="listingsImage">
                <img src="https://picsum.photos/id/84/768/512">
                <div class="listingType">For Sale</div>
              </div>
              <div class="listingContent">
                <span class="price">$4,500,000</span>
                <p>456 Ipsum Avenue, Sit Amet City, FL 54321</p>
                <div class="listingInfo">
                  <span>5 Beds</span> -
                  <span>3 Baths</span> -
                  <span>4,200 Sq.Ft.</span>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="listingsBox">
              <div class="listingsImage">
                <img src="https://picsum.photos/id/43/768/512">
                <div class="listingType">For Sale</div>
              </div>
              <div class="listingContent">
                <span class="price">$5,999,000</span>
                <p>123 Dollar Ipsum Lane, Lorem Two, OH 12345</p>
                <div class="listingInfo">
                  <span>4 Beds</span> - <span>4 Baths</span> - <span>3,660 Sq.Ft.</span>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="listingsBox">
              <div class="listingsImage">
                <img src="https://picsum.photos/id/122/768/512">
                <div class="listingType">For Sale</div>
              </div>
              <div class="listingContent">
                <span class="price">$3,200,000</span>
                <p>789 Sit Avenue, Dolor Ipsum, TX 98765</p>
                <div class="listingInfo">
                  <span>3 Beds</span> -
                  <span>2 Baths</span> -
                  <span>2,000 Sq.Ft.</span>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="listingsBox">
              <div class="listingsImage">
                <img src="https://picsum.photos/id/84/768/512">
                <div class="listingType">For Sale</div>
              </div>
              <div class="listingContent">
                <span class="price">$2,750,000</span>
                <p>987 Ipsum Street, Consectetur City, IL 34567</p>
                <div class="listingInfo">
                  <span>6 Beds</span> -
                  <span>5 Baths</span> -
                  <span>5,000 Sq.Ft.</span>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="listingsBox">
              <div class="listingsImage">
                <img src="https://picsum.photos/id/43/768/512">
                <div class="listingType">For Sale</div>
              </div>
              <div class="listingContent">
                <span class="price">$3,850,000</span>
                <p>321 Amet Street, Adipiscing City, WA 56789</p>
                <div class="listingInfo">
                  <span>4 Beds</span> -
                  <span>3 Baths</span> -
                  <span>3,200 Sq.Ft.</span>
                </div>
              </div>
            </div>
          </swiper-slide>    
      
      </swiper-container>
    </div>
  </div>


  <!-- ======= Services Section ======= -->
  <section class="services bg-primary-50 py-16 md:py-28" >
    <div class="container mx-auto" data-aos="fade-up">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 lg:gap-40 2xl:gap-64">
        <div class="col-sapn-1 md:col-span-2">
          <h2 class="small-title">We make it simple</h2>
          <p>Nunc vel nunc elit. Phasellus dictum elit sit amet sem maximus rutrum. Pellentesque a sem pulvinar, pretium mauris sit amet, faucibus nunc. Nam a tellus sollicitudin enim consequat convallis. Suspendisse sit amet sapien posuere, volutpat quam hendrerit, suscipit tellus.</p>
        </div>
        <div class="col-sapn-1 md:col-span-1">
          <ul class="max-w-md space-y-1 md:space-y-2  text-gray-500 list-inside dark:text-gray-400">
            <li class="flex items-center">
                <svg class="w-4 h-4 me-3 text-myBlue dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                 </svg>
                 New Construction
            </li>
            <li class="flex items-center">
                <svg class="w-4 h-4 me-3 text-myBlue dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                 </svg>
                 Remodeling & Renovation
            </li>
            <li class="flex items-center">
                <svg class="w-4 h-4 me-3 text-myBlue dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                 </svg>
                 Design Services
            </li>
            <li class="flex items-center">
                <svg class="w-4 h-4 me-3 text-myBlue dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                 </svg>
                 Project Management
            </li>
            <li class="flex items-center">
                <svg class="w-4 h-4 me-3 text-myBlue dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                 </svg>
                 No Hassle Payment Process
            </li>
            
        </ul>
          
        </div>
      </div>
    </div>
    </section>
  <section class="services bg-primary-50">
    <div class="container mx-auto" data-aos="fade-up">

      <div class="grid grid-cols-3 gap-10 pb-4">
     
        <div class="rounded-lg shadow p-6 relative isolate border border-gray-200" style="background: url({box1}) top right no-repeat; background-size: contain;">
          <ZoomInOutline class="w-7 h-7 mb-3 text-gray-500 dark:text-gray-400" strokeWidth="1"/>
          <a href="/">
            <h5 class="mb-2 text-xl lg:text-2xl  tracking-tight text-myBlue dark:text-white">Property Search</h5>
          </a>
          <p class="mb-3  text-gray-500 dark:text-gray-400">Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non
            ut nesciunt dolorem.</p>
            <a href="/about" class="tBtn2 tBtn2Alt mt-6 border-myBlue">Learn More</a>

          </div>
        <div class="text-gray-500  rounded-lg border border-gray-200 shadow-md p-6 isolate" style="background: url({box2}) top right no-repeat; background-size: contain;">
          <ScaleBalancedOutline class="w-7 h-7 mb-3 text-gray-500 dark:text-gray-400" strokeWidth="1"/>
          <a href="/">
            <h5 class="mb-2 text-xl lg:text-2xl tracking-tight text-myBlue dark:text-white">Property Valuation</h5>
          </a>
          <p class="mb-3  text-gray-500 dark:text-gray-400">Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non
            ut nesciunt dolorem.</p>
            <a href="/about" class="tBtn2 tBtn2Alt mt-6 border-myBlue">Learn More</a>

          </div>
        <div class="text-gray-500  rounded-lg border border-gray-200 shadow-md p-6 isolate" style="background: url({box3}) top left no-repeat; background-size: contain;">
          <ShieldCheckOutline class="w-7 h-7 mb-3 text-gray-500 dark:text-gray-400" strokeWidth="1" />
          <a href="/">
            <h5 class="mb-2 text-xl lg:text-2xl  tracking-tight text-myBlue dark:text-white">Concerage Services</h5>
          </a>
          <p class="mb-3  text-gray-500 dark:text-gray-400">Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non
            ut nesciunt dolorem.</p>
            <a href="/about" class="tBtn2 tBtn2Alt mt-6 border-myBlue">Learn More</a>

          </div>
     
     
      </div>

    </div>
  </section><!-- End Services Section -->

  <!-- ======= Call To Action Section ======= -->
  <div class="container-fluid callToAction mt-16 md:mt-28 h-screen" style="background: url({homeCta}) top right no-repeat; background-size: cover;background-attachment:fixed;">   
    <div class="ctaText shadow-md">
      <a href="#">
        <h2 class="title title-2">We always want to go a step further</h2>
        <p class="texte-c contenu widowFix">That's why we take the time to find the solutions that meet
          your needs
        </p>
       
        <a href="/about" class="tBtn2 tBtn2Alt mt-6 border-myBlue">Let's go further</a>

      </a>
    </div>
  </div>


</main>