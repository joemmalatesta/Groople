<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	export let index: number,
		category: string,
		letter: string,
		valid: string,
		recordedAnswer: string, //answer after submission
		answersSubmitted: boolean,
		loading: boolean = false,
		forModal: boolean = false;
	let answer: string = ''; //answer before submission
	let cssOutline: string = '';
	$: if (!recordedAnswer && answersSubmitted) {
		answer = '';
		loading = true;
	}

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
	let rebuttalClicked: boolean = false;
	let rebuttalResponseEmoji: string = '';
	let rebuttalFinished: boolean = false;

	// Rebuttal Swag
	async function rebuttal() {
		rebuttalClicked = true;
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
			//add 1 to yesCount, remove 1 from previous scores array and add 1 to new scores array
			if (browser) {
				let scores = JSON.parse(String(localStorage.getItem('scores')));
				let yesCount = Number(localStorage.getItem('yesCount'));
				let localAnswers = JSON.parse(String(localStorage.getItem('answers')));
				scores[yesCount] -= 1;
				scores[yesCount + 1] += 1;
				localStorage.setItem('yesCount', String(yesCount + 1));
				localStorage.setItem('scores', JSON.stringify(scores));
				localAnswers[index - 1] = 'yes';
				localStorage.setItem('answers', JSON.stringify(localAnswers));
			}
		} else {
			rebuttalResponseEmoji = '❌';
		}
	}
</script>

<div
	class="flex sm:justify-between items-start mx-6 md:mx-0 md:items-center sm:flex-row flex-col {loading
		? 'md:h-9'
		: ''}"
>
	<label class="p-1 text-xl {loading ? 'skeleton skeleton-text' : 'hidden'}" for="{index}Input" />
	<label class="p-1 text-xl {loading ? 'hidden' : ''}" for="{index}Input">{index}: {category}</label
	>
	{#if !recordedAnswer}
		<input
			bind:value={answer}
			type="text"
			placeholder={loading ? '' : `${letter}...`}
			class="focus:outline-none p-1 rounded-md w-full sm:w-fit {forModal ? "text-black": ""} {loading
				? 'skeleton'
				: `${cssOutline} border-2`}"
			name="{index} : {category}"
			id="{index}Input"
			autocomplete="off"
			spellcheck="true"
		/>
	{:else}
		<div class="flex md:flex-col justify-end md:items-end">
			<p class="text-xl">
				<span class="underline">{recordedAnswer}</span>
				{validResponse}{rebuttalResponseEmoji !== '' ? rebuttalResponseEmoji : ''}
			</p>
			{#if recordedAnswer
				.toLowerCase()
				.startsWith(letter.toLowerCase()) && valid !== 'yes' && rebuttalFinished === false && rebuttalClicked === false}
				<!-- Maybe I can make this a refresh logo as well. -->
				<button class="px-2 py-0.5 bg-neutral-600 hover:bg-neutral-700 rounded-3xl text-white text-sm" type="button" on:click={rebuttal}>Rebuttal</button>
			{/if}
		</div>
	{/if}
</div>

<style>
	.skeleton {
		animation: skeleton-loading 1s linear infinite alternate;
		opacity: 0.75;
	}

	.skeleton-text {
		width: 15rem;
		height: 0.7rem;
		margin: 0.25rem;
		border-radius: 0.2rem;
	}

	@keyframes skeleton-loading {
		0% {
			background-color: hsl(200, 20%, 70%);
		}
		100% {
			background-color: hsl(200, 20%, 95%);
		}
	}
</style>
