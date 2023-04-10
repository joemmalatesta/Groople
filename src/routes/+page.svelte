<script lang="ts">
	import Category from "../components/Category.svelte";

	export let data
	const categories: string[] = [
		'Animals',
		'Things found in a classroom',
		'Types of vehicles',
		'Breakfast foods',
		'Famous athletes',
		'Fictional characters',
		'Things that are round',
		'Musical instruments',
		'Tourist attractions',
		'College majors',
		'Things found in a park',
		'Types of fabric'
	];

	// Choose or select Letter
    let letter: string = randomLetter();
	function randomLetter() {
		//Only scattergories letters
		const characters = "abcdefghijklmnoprstw";
		return characters.charAt(Math.floor(Math.random() * characters.length)).toUpperCase();
	}
    let answer = true
</script>

<div class="flex justify-center items-center flex-col">
	<h1 class="text-6xl">{data.message}</h1>
	<form action="POST" class="flex flex-col mt-5">
		{#each categories as  category, index}
			<Category index={index} category={category} letter={letter}/>
		{/each}
		<button type="submit" class="bg-blue-400 p-2">Submit</button>
	</form>
</div>
