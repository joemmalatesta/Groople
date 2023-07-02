<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	export let index: number,
		category: string,
		letter: string,
		valid: string,
		recordedAnswer: string, //answer after submission
		modalActive: boolean,
		answersSubmitted: boolean;
	let answer: string = ''; //answer before submission
	let cssOutline: string = '';

	// Validate Based on
	$: if (answer.toLowerCase().startsWith(letter.toLowerCase()) && answer.length >= 1) {
		cssOutline = 'border-green-500/80';
	} else if (answer.length == 0) {
		cssOutline = 'border-neutral-800/80';
	} else {
		cssOutline = 'border-red-500/80';
	}

	let validResponse = '';
	//Use recorded answer instead of answer in order to uhhh cuz answer gets deleted IDK why
	$: if (valid !== '') {
		if (valid === 'yes' && recordedAnswer.toLowerCase().startsWith(letter.toLowerCase())) {
			validResponse = '✔️';
		} else {
			validResponse = '❌';
		}
	}

	$: if (recordedAnswer === 'ZZZZZZ') {
		recordedAnswer = 'Unanswered';
	}

	let rebuttalResponse: string;
	let rebuttalResponseEmoji: string = '';
	let rebuttalFinished: boolean = false;
	async function rebuttal() {
		let response = await fetch('/api/rebuttal', {
			method: 'POST',
			body: JSON.stringify({ category, recordedAnswer }),
			headers: {
				'content-type': 'application/json',
				accept: 'application/json'
			}
		});
		rebuttalResponse = await response.json();
		rebuttalFinished = true;
		if (rebuttalResponse === 'yes') {
			rebuttalResponseEmoji = '✔️';
			if (browser) {
				//add 1 to yesCount, remove 1 from previous scores array and add 1 to new scores array
			}
		} else {
			('❌');
		}
	}
</script>

<div class="flex md:justify-between items-start mx-6 md:mx-0 md:items-center sm:flex-row flex-col">
	<label class="p-1 text-xl" for="{index}Input">{index}: {category}</label>
	{#if !recordedAnswer && answersSubmitted}
		<img src="loading.svg" alt="response loading" class="md:w-20 w-10 h-8" />
	{:else if !recordedAnswer}
		<input
			bind:value={answer}
			type="text"
			placeholder="{letter}..."
			class="focus:outline-none p-1 border-2 {cssOutline} rounded-md w-full md:w-fit"
			name="{index} : {category}"
			id="{index}Input"
			autocomplete="off"
			spellcheck="true"
		/>
	{:else}
		<div class="flex md:flex-col justify-end md:items-end">
			<p class="text-xl">
				<span class="underline">{recordedAnswer}</span>
				{rebuttalResponseEmoji !== '' ? rebuttalResponseEmoji : validResponse}
			</p>
			{#if recordedAnswer
				.toLowerCase()
				.startsWith(letter.toLowerCase()) && valid !== 'yes' && rebuttalFinished === false}
				<button type="button" on:click={rebuttal}>Rebuttal</button>
			{/if}
		</div>
	{/if}
</div>
