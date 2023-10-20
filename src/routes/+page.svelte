<script lang="ts">
	import Category from '../components/Category.svelte';
	import { slide } from 'svelte/transition';
	import Time from '../components/Timer.svelte';
	import { enhance } from '$app/forms';
	import RulesModal from '../components/RulesModal.svelte';
	import { browser } from '$app/environment';
	import Scores from '../components/Scores.svelte';
	import { onMount } from 'svelte';
	import AlreadyPlayedLanding from '../components/AlreadyPlayedLanding.svelte';
	import RepeatUserModal from '../components/RepeatUserModal.svelte';
	//Width of user's screen. Used for determining to show countdown numbers or not.
	let screenSize: number;

	//get daily challenge data from the +page.ts and populate the screen!
	export let data: any;
	let letter: string = '';
	let categories: string[] = [];
	let creator: string = '';
	//Don't know why this is necessary now and not before, but... data.data prevents 500 error
	//It just makes sure all is loaded before we start trying to get silly
	$: letter = data.data ? data.data[0].letter : '';
	$: categories = data.data ? Object.values(data.data[0].categories) : [];
	$: creator = data.data ? data.data[0].creator : '';

	//Set up board for days already played.
	//Answers are Checks or X's, inputs are the recorded answers
	let localAnswers: any, localInputs: any;
	let currentDate: any = new Date();
	currentDate = `${currentDate.getFullYear()}-${
		currentDate.getMonth() + 1
	}-${currentDate.getDate()}`;
	let lastPlayed: string | null = 'placeholder',
		tomorrow: string | null;
	let repeatPlayer: boolean | null; //show different starting modal depending on if they've played before.
	onMount(() => {
		lastPlayed = localStorage.getItem('lastPlayed');
		tomorrow = localStorage.getItem('tomorrow');
		localAnswers = JSON.parse(String(localStorage.getItem('answers')));
		localInputs = JSON.parse(String(localStorage.getItem('input')));
		repeatPlayer = Boolean(localStorage.getItem('repeatPlayer'));
		if (currentDate == lastPlayed) {
			scoresModalActive = true;
		}
		//reset rebuttal count. If logged in, give 12 rebuttals just for fun
		// if (currentDate != lastPlayed) {
		// 	//if not logged in
		// 	localStorage.setItem('rebuttalsRemaining', '2');
		// 	//if logged in
		// 	// localStorage.setItem("rebuttalsRemaining", "12")
		// }
	});

	// Show rules modal before each game. controls category blur and timer
	let modalActive = true; //rules modal
	let scoresModalActive = false;

	//Submit the form when time = 0, and pressing submit makes the time 0.
	let time: number = 100;
	// Manually click form element so it doesn't accidentally submit.
	let answersSubmitted: boolean = false;
	let formElement: any;
	$: if (time === 0) {
		answersSubmitted = true;
		//Submit form
		const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
		formElement.dispatchEvent(submitEvent);
		//Increment play count today.
		fetch('/api/incrementPlayCount', {
			method: 'POST',
			body: JSON.stringify({ date: currentDate }),
			headers: {
				'content-type': 'application/json',
				accept: 'application/json'
			}
		});
	}

	//THIS IS FOR HANDLING THE DATA WHEN YOU SUBMIT THE FORM
	let inputArray: string[] = [];
	let answerArray: string[] = [];
	let responseArray: string[] = [];
	async function handleResponse(form: any) {
		// Get input and output after submitting the form.
		inputArray = form?.input?.split('\n') || [];
		//two step process to get the answers that the user submitted
		answerArray = inputArray.map((item) => item.split(':')[2].trim());
		// Add for use in same day.

		//Response is GPT's response to the answers.
		responseArray = form?.output?.split('\n') || [];

		if (browser) {
			localStorage.setItem('input', JSON.stringify(inputArray));
			localStorage.setItem('answers', JSON.stringify(responseArray));
		}
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

	let progressPercent: number = 0;
	$: progressPercent = 100 - time;
</script>

<svelte:head>
	<title>Groople</title>
	<meta
		name="description"
		content="Play daily challenge! Answer 12 Categories starting with the letter {letter} in 100 seconds. Share your results!"
	/>
</svelte:head>

<!-- This logic is good. Wait until placeholder changes. and have loading while it does. -->
{#if lastPlayed == 'placeholder' || letter === ''}
	<!-- should be a correctly sized box with the loading stripe you know what I mean.. the shimmer -->
	<div class="flex justify-center items-center flex-col">
		<p class="md:text-3xl text-xl">{date.toLocaleDateString()}</p>
	</div>
	<div class="md:mb-[6.5rem]" />
	<div class="flex items-center justify-center md:flex-row flex-col w-full relative md:mt-5">
		<div class="flex flex-col mt-5 items-center relative w-full">
			<div class="lg:w-1/2 w-full">
				<!-- Placeholder values, no real form elements. -->
				<input type="text" value={letter} class="hidden" name="letter" />
				{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as category, index}
					{#key responseArray}
						<div class="my-1 w-full md:border-b-2">
							<Category
								index={index + 1}
								category={String(category)}
								{letter}
								valid={responseArray[index] ? responseArray[index].toLowerCase() : ''}
								recordedAnswer={answerArray[index]}
								{answersSubmitted}
								loading={true}
							/>
						</div>
					{/key}
				{/each}
			</div>
			<button
				class="p-2 opacity-90 bg-neutral-800 hover:bg-neutral-900 drop-shadow-md rounded-md text-white md:w-1/2 w-11/12 mb-2 animate-pulse h-9"
			/>
		</div>
	</div>
{:else}
	<!-- If you played today, go view your scores, you can't play again today -->
	{#if currentDate == lastPlayed}
		<AlreadyPlayedLanding
			{categories}
			{letter}
			{creator}
			{answersSubmitted}
			{responseArray}
			{localAnswers}
			{localInputs}
			{scoresModalActive}
		/>
	{/if}

	<!-- ACTUAL GAMEPLAY HERE -->
	{#if currentDate != lastPlayed}
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
			<!-- if 500 error from GPT -->
			{#if responseArray[0] == '500 error'}
				<p class="md:text-2xl text-xl text-red-500 font-bold">Our judge is on break... try again later</p>
				<p class="text-red-500 font-semibold">(Something went wrong, <a class="underline underline-offset-2 hover:underline-offset-4 transition-all" href="https://joemmalatesta.com/#contact">let me know</a>) </p>
			{/if}
			<div class="flex items-center justify-center md:flex-row flex-col w-full relative md:mt-5">
				<div class="flex flex-col mt-5 items-center relative {modalActive ? 'blur' : ''} w-full">
					<form
						bind:this={formElement}
						method="POST"
						use:enhance={() =>
							async ({ result, update }) => {
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
										{answersSubmitted}
										disabled={modalActive}
									/>
								</div>
							{/key}
						{/each}
					</form>

					{#if responseArray.length < 1}
						<button
							disabled={modalActive}
							class="p-2 bg-neutral-800 hover:bg-neutral-900 drop-shadow-md rounded-md text-white md:w-1/2 w-11/12 mb-2"
							on:click={() => {
								time = 0;
								answersSubmitted = true;
							}}>Submit</button
						>
					{/if}
					{#if responseArray.length > 1 && scoresModalActive === false}
						<button
							class="p-2 bg-neutral-800 hover:bg-neutral-900 drop-shadow-md rounded-md text-white md:w-1/2 w-11/12 mb-2"
							on:click={() => {
								scoresModalActive = true;
							}}>Show Results</button
						>
					{/if}
					{#if creator}
						<p class="text-xs">Todays categories by {creator}</p>
					{/if}
				</div>
			</div>
		</div>
		<!-- Show starting modal, either the rules or the minimal one. -->
		{#if modalActive}
			{#if repeatPlayer}
				<div class="absolute inset-0 p-2 mt-48 flex justify-center h-fit z-50">
					<RepeatUserModal bind:modalActive {letter} />
				</div>
			{:else}
				<div class="absolute inset-0 p-2 mt-48 flex justify-center h-fit z-50">
					<RulesModal bind:modalActive {letter} />
				</div>
			{/if}
		{/if}
		<!-- Show scores after game is done! -->
		{#if responseArray.length > 1 || scoresModalActive === true}
			<div class="absolute inset-0 p-2 mt-48 flex justify-center h-fit z-50">
				<Scores bind:scoresModalActive />
			</div>
		{/if}
		<!-- Time updates, only on phone screen -->
		{#if screenSize < 640}
			{#if time == 75 || time == 50 || time == 25 || time == 10 || time == 5 || time == 4 || time == 3 || time == 2 || time == 1}
				{#key time}
					<div class="fixed inset-0 flex items-center justify-center pointer-events-none">
						<div class="text-center">
							<p class="text-7xl countdown z-50">{time}</p>
						</div>
					</div>
				{/key}
			{/if}
		{/if}
	{/if}
{/if}
<svelte:window bind:innerWidth={screenSize} />

<style>
	@keyframes countdownAnimation {
		0% {
			transform: scale(0.75);
			opacity: 0;
		}
		50% {
			transform: scale(1.25);
			opacity: 0.8;
		}
		100% {
			transform: scale(0.75);
			opacity: 0;
		}
	}

	.countdown {
		animation: countdownAnimation 1s ease-in-out forwards;
	}
</style>
