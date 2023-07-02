<script lang="ts">
	import Category from '../components/Category.svelte';
	import { slide } from 'svelte/transition';
	import Time from '../components/Timer.svelte';
	import { enhance } from '$app/forms';
	import RulesModal from '../components/RulesModal.svelte';
	import { browser } from '$app/environment';
	import Scores from '../components/Scores.svelte';
	import { onMount } from 'svelte';

	// Get information from +page.server.ts
	export let form;

	let currentDate: any = new Date();
	currentDate = `${currentDate.getFullYear()}-${
		currentDate.getMonth() + 1
	}-${currentDate.getDate()}`;
	let lastPlayed: string | null, tomorrow: string | null;
	onMount(() => {
			lastPlayed = localStorage.getItem('lastPlayed');
			tomorrow = localStorage.getItem('tomorrow');
	});

	// Show rules modal before each game. controls category blur and timer
	let modalActive = true;
	let scoresModalActive = false;


	let time: number = 100;

	// Manually click form element so it doesn't accidentally submit.
	let answersSubmitted: boolean = false;
	let formElement: any;
	$: if (time === 0) {
		const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
		formElement.dispatchEvent(submitEvent);
		
		// Change time to a loading symbol
	}

	//List of 250 categories. Chose 12 random. won't be the case for always though
	const allCategories: string[] = [
		"A Boy's Name",
		'U.S. Cities',
		'Things That Are Cold',
		'School Supplies',
		'Pro Sports Teams',
		'Insects',
		'Breakfast Foods',
		'Furniture',
		'T.V. Shows',
		'Things That Are Found in the Ocean',
		'Presidents',
		'Product Names',
		'Appliances',
		'Types of Drink',
		'Personality Traits',
		'Articles of Clothing',
		'Desserts',
		'Car Parts',
		'Things Found on a Map',
		'Athletes',
		'4-Letter Words',
		'Items in a Refrigerator',
		'Farm Animals',
		'Street Names',
		'Things on a Beach',
		'Colors',
		'Tools',
		"A Girl's Name",
		'Villains/Monsters',
		'Footwear',
		"Something You're Afraid Of",
		'Terms of Measurement',
		'Book Titles',
		'Heroes',
		'Gifts/Presents',
		'Kinds of Dances',
		'Things That Are Black',
		'Vehicles',
		'Tropical Locations',
		'College Majors',
		'Dairy Products',
		'Things in a Souvenir Shop',
		'Items in Your Purse/Wallet',
		'Famous Females',
		'Medicine/Drugs',
		'Things Made of Metal',
		'Hobbies',
		'People in Uniform',
		'Things You Plug In',
		'Animals',
		'Languages',
		'Names Used in the Bible',
		'Junk Food',
		'Things That Grow',
		'Companies',
		'Video Games',
		'Electronic Gadgets',
		'Board Games',
		'Things That Use a Remote',
		'Card Games',
		'Internet Lingo',
		'Offensive Words',
		'Wireless Things',
		'Computer Parts',
		'Software',
		'Websites',
		'Game Terms',
		'Things in a Grocery Store',
		'Reasons to Quit Your Job',
		'Things That Have Stripes',
		'Tourist Attractions',
		'Diet Foods',
		'Things Found in a Hospital',
		'Food/Drink That Is Green',
		'Weekend Activities',
		'Acronyms',
		'Seafood',
		'Christmas Songs',
		'Words Ending in -N',
		'Words With Double Letters',
		`Children's Books`,
		'Things Found at a Bar',
		'Sports Played Indoors',
		'Names Used in Songs',
		'Foods You Eat Raw',
		'Places in Europe',
		'Olympic Events',
		'Things You See at the Zoo',
		'Math Terms',
		'Animals in Books or Movies',
		'Things to Do at a Party',
		'Sandwiches',
		'Items in a Catalog',
		'World Leaders/Politicians',
		'School Subjects',
		'Excuses for Being Late',
		'Ice Cream Flavors',
		'Things That Jump/Bounce',
		'Television Stars',
		'Things in a Park',
		'Foreign Cities',
		'Stones/Gems',
		'Musical Instruments',
		'Nicknames',
		'Things in the Sky',
		'Pizza Toppings',
		'Colleges/Universities',
		'Fish',
		'Countries',
		'Things That Have Spots',
		'Historical Figures',
		'Terms of Endearment',
		'Items in This Room',
		'Fictional Characters',
		'Menu Items',
		'Magazines',
		'Capitals',
		'Kinds of Candy',
		'Items You Save Up to Buy',
		'Something You Keep Hidden',
		'Items in a Suitcase',
		'Things With Tails',
		'Sports Equipment',
		'Crimes',
		'Things That Are Sticky',
		'Awards/Ceremonies',
		'Cars',
		'Spices/Herbs',
		'Bad Habits',
		'Cosmetics/Toiletries',
		'Celebrities',
		'Cooking Utensils',
		'Reptiles/Amphibians',
		'Parks',
		'Leisure Activities',
		"Things You're Allergic To",
		'Restaurants',
		'Notorious People',
		'Fruits',
		'Things in a Medicine Cabinet',
		'Toys',
		'Household Chores',
		'Bodies of Water',
		'Authors',
		'Halloween Costumes',
		'Weapons',
		'Things That Are Round',
		'Words Associated With Exercise',
		'Sports',
		'Song Titles',
		'Parts of the Body',
		'Ethnic Foods',
		'Things You Shout',
		'Birds',
		'Methods of Transportation',
		'Items in a Kitchen',
		'Flowers',
		'Things You Replace',
		'Famous Duos and Trios',
		'Things Found in a Desk',
		'Vacation Spots',
		'Diseases',
		'Words Associated With Money',
		'Items in a Vending Machine',
		'Movie Titles',
		'Games',
		'Things That You Wear',
		'Beers',
		'Things at a Circus',
		'Vegetables',
		'States',
		'Things You Throw Away',
		'Occupations',
		'Cartoon Characters',
		'Types of Drinks',
		'Musical Groups',
		'Store Names',
		'Things at a Football Game',
		'Trees',
		'Kinds of Soup',
		'Things Found in New York',
		'Things You Get Tickets For',
		'Things You Do at Work',
		'Foreign Words Used in English',
		"Things You Shouldn't Touch",
		'Spicy Foods',
		'Things at a Carnival',
		'Things You Make',
		'Places to Hang Out',
		'Honeymoon Spots',
		'Things You Buy for Kids',
		'Reasons to Take Out a Loan',
		'Things to Do on a Date',
		'Historic Events',
		'Things You Do Every Day',
		'Things You Get in the Mail',
		'Things You Sit On',
		'Reasons to Make a Phone Call',
		'Titles People Can Have',
		'Things That Have Buttons',
		'Things That Have Wheels',
		'Reasons to Call 911',
		'Ways to Kill Time',
		'Things That Can Get You Fired'
	];

	//Get random letter
	let letter: string = randomLetter();
	function randomLetter() {
		//Only scattergories letters
		const characters = 'abcdefghijklmnoprstw';
		return characters.charAt(Math.floor(Math.random() * characters.length)).toUpperCase();
	}

	//For getting new categories. All this isn't necessary but refactor once I get daily.
	let possibleCategories: string[] = allCategories;
	let categories: string[] = refreshCategories();
	function refreshCategories() {
		//Refresh the letter as well on list refresh
		letter = randomLetter();
		let selectedCategories = [];
		for (let i = 0; i < 12; i++) {
			const randomIndex = Math.floor(Math.random() * possibleCategories.length);
			const selectedCategory = possibleCategories[randomIndex];
			possibleCategories.splice(randomIndex, 1);
			selectedCategories.push(selectedCategory);
		}
		return selectedCategories;
	}



	let inputArray: string[] = [];
	let answerArray: string[] = [];
	let responseArray: string[] = [];
	async function handleResponse(form: any) {
		// Get input and output after submitting the form.
		inputArray = form?.input?.split('\n') || [];
		//two step process to get the answers that the user submitted
		answerArray = inputArray.map((item) => item.split(':')[2].trim());
		//Response is GPT's response to the answers.
		responseArray = form?.output?.split('\n') || [];
		answersSubmitted = true;
	}


	// Count up yes and no's for the share option.
	let yesCount = 0;
	let noCount = 0;
	let scores: any = {
		0: 0,
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0,
		7: 0,
		8: 0,
		9: 0,
		10: 0,
		11: 0,
		12: 0
	};


	// Scores... maybe this little bit is not necessary
	if (browser === true) {
		if (!localStorage.getItem('scores')) {
			localStorage.setItem('scores', JSON.stringify(scores));
		} else {
			scores = JSON.parse(String(localStorage.getItem('scores')));
		}
	}



	$: for (let i = 0; i < responseArray.length; i++) {
		if (
			responseArray[i].toLowerCase() == 'yes' &&
			answerArray[i].toLowerCase().startsWith(letter.toLowerCase())
		) {
			yesCount++;
		} else {
			noCount++;
		}
	}

	let date = new Date();
	// Update score when the string is made
	$: if (yesCount + noCount == 12 && browser === true) {
		localStorage.setItem('yesCount', String(yesCount));
		scores[yesCount] += 1;
		localStorage.setItem('scores', JSON.stringify(scores));
	}
</script>

<svelte:head>
	<title>Scatter</title>
</svelte:head>



	<div class="flex justify-center items-center flex-col">
		<p class="md:text-3xl text-xl">{date.toLocaleDateString()}</p>

		<!-- Worry about these always being seen on the phone version -->
		<div
			class="flex items-center justify-between py-4 md:w-1/3 border-b-2 md:border-none sticky md:static top-0 md:top-auto z-40 px-20 bg-white w-full"
		>
			<h3 class="lg:text-6xl md:text-4xl text-3xl flex flex-col justify-center items-center">
				<p class="text-xl underline-offset-2 underline">Letter</p>
				{letter}
			</h3>
			<!-- Kinda hacky but IDC -->
			{#if !modalActive}
				<h3 class="lg:text-6xl md:text-4xl text-3xl flex flex-col justify-center items-center">
					<p class="text-xl underline-offset-2 underline">Time</p>
					<Time bind:time />
				</h3>
			{:else}
				<h3 class="lg:text-6xl md:text-4xl text-3xl flex flex-col justify-center items-center">
					<p class="text-xl underline-offset-2 underline">Time</p>
					100
				</h3>
			{/if}
		</div>
		<div class="flex items-center justify-center md:flex-row flex-col w-full relative md:mt-5">
			<div class="flex flex-col mt-5 items-center relative {modalActive ? 'blur' : ''} w-full">
				<form
					bind:this={formElement}
					method="POST"
					use:enhance={() => async ({ result, update }) => {
						await update();
						if (result.type === 'success') handleResponse(result.data); // `result.data` === `form`
					  }}
					class="lg:w-1/2 w-full"
				>
					<!-- Have this here, so the letter is sent with the form details. I'm sure theres a better way -->
					<input type="text" value={letter} class="hidden" name="letter" />
					{#each categories as category, index}
						{#key responseArray}
							<div class="my-1 w-full md:border-b-2" transition:slide={{ duration: 500 }}>
								<Category
									index={index + 1}
									{category}
									{letter}
									valid={responseArray[index] ? responseArray[index].toLowerCase() : ''}
									recordedAnswer={answerArray[index]}
									{modalActive}
									{answersSubmitted}
								/>
							</div>
						{/key}
					{/each}
				</form>

				{#if responseArray.length < 1}
					<button
						class="p-2 bg-neutral-800 hover:bg-neutral-900 drop-shadow-md rounded-md text-white md:w-1/2 w-full mb-5"
						on:click={() => {
							time = 0;
						}}>Submit</button
					>
				{/if}
				{#if responseArray.length > 1 && scoresModalActive === false}
					<button
						class="p-2 bg-neutral-800 hover:bg-neutral-900 drop-shadow-md rounded-md text-white md:w-1/2 w-full mb-5"
						on:click={() => {
							scoresModalActive = true;
						}}>Show Results</button
					>
				{/if}
			</div>
		</div>
	</div>
	{#if modalActive}
		<div class="absolute inset-0 p-2 mt-48 flex justify-center h-fit z-50">
			<RulesModal bind:modalActive />
		</div>
	{/if}
	{#if responseArray.length > 1 || scoresModalActive === true}
		<div class="absolute inset-0 p-2 mt-48 flex justify-center h-fit z-50">
			<Scores bind:scoresModalActive />
		</div>
	{/if}

