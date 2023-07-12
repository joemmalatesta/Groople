<script lang="ts">
	import { slide } from 'svelte/transition';
	import Category from './Category.svelte';
	//examples for the modal.
	const examples = [
		{
			category: 'Countries',
			answer: 'Wales'
		},
		{
			category: 'Car parts',
			answer: 'Windows'
		},
	];

	export let modalActive: boolean = true;
	export let letter: string;
</script>

<div
	class=" bg-gradient-to-b from-neutral-700 to-neutral-800 text-neutral-100 ring-neutral-500 ring-2 rounded-lg md:p-12 p-2 drop-shadow-2xl"
>
	<!-- How to Play -->
	<h3 class="md:text-2xl text-xl font-bold underline underline-offset-4 text-center mb-2">
		How to Play
	</h3>
	<p class="flex flex-col items-start text-base md:text-xl mb-2">
		For each category, find a word that fits the category and starts with "{letter}"
	</p>

	<!-- Do something about the rebuttal rule here as well -->
	{#each examples as example, index}
		<div class="w-full flex flex-col md:px-20">
			<Category
				index={index + 1}
				category={example.category}
				{letter}
				recordedAnswer={''}
				valid={'yes'}
				answersSubmitted={false}
				forRules={true}
			/>
		</div>
	{/each}
	<div class="flex flex-col items-center text-sm md:text-xl mt-2">
		<p>Answers are judged by AI and either given a ✔️ or ❌</p>
		<p class="gap-2 flex items-center">For incorrect answers, you can <span class="px-2 py-0.5 bg-neutral-600 hover:bg-neutral-700 rounded-3xl text-white text-sm cursor-pointer" >Rebuttal</span> the AI
		</p>
		<p>You have 100 seconds to answer 12 categories</p>
	</div>
	<div class="flex justify-center items-center m-3">
		<button
			type="button"
			class="p-2 hover:bg-neutral-900 bg-neutral-800 ring-2 ring-neutral-500/20 text-white rounded-md"
			on:click={() => {
				modalActive = !modalActive;
			}}>Start Daily Challenge</button
		>
	</div>
</div>