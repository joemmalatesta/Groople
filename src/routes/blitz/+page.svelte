<script lang="ts">
	import { enhance } from '$app/forms';
	import { Result } from 'postcss';
	import Timer from '../../components/Timer.svelte';

	let categories: string[];
	let letter: string;
	let index = 0;
	let time = 10;
	let gameOver = false

	// Get data from +page.ts
	export let data: any;
	$: if (data.data) {
		categories = data.data[0].categories.slice(0, 10);
		letter = data.data[0].letter;
	}

	// Get result from server for each time
	function handleResponse(response: any) {
		if (response.output.toLowerCase() == 'yes') {
			if (index < 9) {
				index++;
				time = 10;
			} else {
				gameOver = true
			}
		} else {
			gameOver = true
		}
	}

	// Send the response if the time runs out
	let formElement: any;
	$: if (time === 0) {
		//Submit form
		const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
		formElement.dispatchEvent(submitEvent);
	}

	let date = new Date();
	let currentAnswer = ""
</script>

<!-- The idea for this is to have 10 prompts with a single letter each day. -->
<!-- It goes through the categories one by one and you only continue if you get it right.  -->
<!-- 10 seconds for each -->

<!-- If categories loaded -->
{#if categories && !gameOver}
	<main class="flex justify-center items-center flex-col">
		<div class="flex flex-col items-center md:text-3xl text-xl">
			<p>Blitz</p>
			<p>{date.toLocaleDateString()}</p>
		</div>
		<div
			class="flex items-center justify-between py-4 md:w-1/3 border-b-2 md:border-none sticky md:static top-0 md:top-auto z-40 px-20 bg-white w-full"
		>
			<h3 class="lg:text-6xl md:text-4xl text-3xl flex flex-col justify-center items-center">
				<p class="text-xl underline-offset-2 underline">Letter</p>
				{letter}
			</h3>
			<!-- Kinda hacky but IDC -->
			{#key index}
				<h3 class="lg:text-6xl md:text-4xl text-3xl flex flex-col justify-center items-center">
					<p class="text-xl underline-offset-2 underline">Time</p>
					<Timer bind:time />
				</h3>
			{/key}
		</div>
		<form
			method="POST"
			bind:this={formElement}
			use:enhance={() =>
				async ({ result, update }) => {
					await update();
					if (result.type === 'success') handleResponse(result.data); // `result.data` === `form`
				}}
			class="flex flex-col w-96 my-8 drop-shadow-xl"
		>
			<h3 class="text-2xl font-semibold py-1">{index + 1}/10 - {categories[index]}</h3>

			<input
				type="text"
				name={categories[index]}
				class="border-4 border-neutral-800 rounded-t-md p-2 text-xl {String(currentAnswer[0]).toLowerCase() == String(letter).toLowerCase() ? "border-green-500/80" : currentAnswer ? "border-red-500/80" : "border-neutral-800" }"
				bind:value={currentAnswer}
			/>
			<input class="hidden" type="text" name="letter" value={letter} />
			<!-- Idea is for the button to slowly full up with neutral -->
			<!-- So have two overlapping buttons and one gets shown as the other depletes or something. -->
			<button
				type="button"
				class="rounded-b-md bg-neutral-800 text-2xl p-2 text-white"
				on:click={() => {
					time = 0;
				}}>Submit</button
			>
		</form>
	</main>
	<!-- Else do loading -->
{:else if gameOver}
<div class="flex flex-col justify-center items-center gap-5">
	<h1 class="text-9xl font-bold">Game over</h1>
	<h2 class="text-4xl ">Your score: {index > 0 ? index: 0}/10</h2>
</div>
{/if}
