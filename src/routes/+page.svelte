<script lang="ts">
	import { enhance } from "$app/forms";
	import { each } from "svelte/internal";
	import Category from "../components/Category.svelte";

	export let form
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
	$: console.log(form)
	let responseArray : string[] = form?.message.split("\n") || []
	$: responseArray = form?.message.split("\n") || []
</script>

<div class="flex justify-center items-center flex-col">
	<h1 class="text-6xl">Scattergories</h1>
	<h1 class="text-6xl">Letter: {letter}</h1>
	<form method="POST" use:enhance  class="flex flex-col mt-5 items-center w-4/5">
		<input type="text" name=letter value={letter} class="hidden">
		{#each categories as  category, index}
			<Category index={index + 1} category={category} letter={letter} valid={responseArray[index] ? responseArray[index].toLowerCase() : ""}/>
		{/each}
		<button type="submit" class="bg-blue-400 hover:bg-blue-500 p-2 w-60">Submit</button>
	</form>

</div>
