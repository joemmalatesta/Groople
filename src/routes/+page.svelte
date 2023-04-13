<script lang="ts">
	import { enhance } from '$app/forms';
	import Category from '../components/Category.svelte';

	export let form;
	let allCategories: string[] = [
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

	let letter: string = randomLetter();
	function randomLetter() {
		//Only scattergories letters
		const characters = 'abcdefghijklmnoprstw';
		return characters.charAt(Math.floor(Math.random() * characters.length)).toUpperCase();
	}

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

	// Get input and output for the thing
	let inputArray: string[] = [];
	$: inputArray = form?.input?.split('\n') || [];
	let answerArray: string[] = [];
	$: answerArray = inputArray.map((item) => item.split(':')[2].trim());
	let responseArray: string[] = [];
	$: responseArray = form?.output?.split('\n') || [];
</script>

<div class="flex justify-center items-center flex-col">
	<h1 class="lg:text-6xl text-3xl">Daily Challenge</h1>
	<div class="flex items-center justify-center md:flex-row flex-col w-full">
		<h1 class="lg:text-6xl md:text-3xl text-2xl md:mr-20">Letter: {letter}</h1>
		<form method="POST" use:enhance class="flex flex-col mt-5 items-center">
			{#each categories as category, index}
				<div class="my-1 w-full">
					<Category
						index={index + 1}
						{category}
						{letter}
						valid={responseArray[index] ? responseArray[index].toLowerCase() : ''}
						recordedAnswer={answerArray[index]}
					/>
				</div>
			{/each}
			<button type="submit" class="bg-blue-400 hover:bg-blue-500 p-2 w-60">Submit</button>
		</form>
	</div>
</div>
