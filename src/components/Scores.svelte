<script lang="ts">
	import va from '@vercel/analytics';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import ScoreChart from './ScoreChart.svelte';
	// import { clickOutside } from '../lib/clickOutside.js';

	let scores: any = null; // local, personal, scores
	let yesCount: any; // Amount of correct answers
	export let scoresModalActive: boolean;
	let streak: number | null; //Current streak
	let supabaseScores: { [key: number]: number }; // scores from everyone for the day.
	let scorePercentile: string; //What percentile your score is in, compared to everyone else
	onMount(() => {
		scoresModalActive = true;
		//set player as repeatPlayer, so rules aren't shown for tomorrow.
		localStorage.setItem('repeatPlayer', 'true');
		// Get scores and todays score
		scores = JSON.parse(String(localStorage.getItem('scores'))); //scores array
		yesCount = localStorage.getItem('yesCount'); //today score

		//Set played for today
		let currentDate: any = new Date();
		currentDate = `${currentDate.getFullYear()}-${
			currentDate.getMonth() + 1
		}-${currentDate.getDate()}`;

		//update score, if today != lastPlayed
		if (localStorage.getItem('lastPlayed') != currentDate) {
			updateSupabaseScore(new Date().toLocaleDateString('en-US'));
		}

		//get all scores and get the percentile the user scored in
		getSupabaseScores(new Date().toLocaleDateString('en-US')).then((result) => {
			supabaseScores = result;
			// Step 1: Get all the scores
			const allScores = Object.values(supabaseScores).map((score) => Number(score));
			let totalSum = 0;
			for (const score of allScores) {
				totalSum += score;
			}

			let scored = Number(yesCount) + 1;
			allScores.splice(scored);
			let scoresBelowSum = 0;
			for (const score of allScores) {
				scoresBelowSum += score;
			}

			scorePercentile = String(Math.round((scoresBelowSum / totalSum) * 100));
			scorePercentile = appendPercentileSuffix(scorePercentile);
		});

		//set new lastPlayed as today.
		localStorage.setItem('lastPlayed', currentDate);

		//Make a streak if there isn't one..
		if (!localStorage.getItem('streak') && yesCount > 0) {
			localStorage.setItem('streak', String(1));
		} else if (!localStorage.getItem('streak') && yesCount == 0) {
			localStorage.setItem('streak', String(0));
		}

		//add to the streak or delete it
		if (currentDate == localStorage.getItem('tomorrow')) {
			if (yesCount > 0) {
				streak = parseInt(String(localStorage.getItem('streak')));
				localStorage.setItem('streak', String(streak + 1));
			} else if (yesCount == 0) {
				localStorage.setItem('streak', String(0));
			}
		}

		//If not played the day after
		else if (currentDate != localStorage.getItem('tomorrow')) {
			if (yesCount > 0) {
				localStorage.setItem('streak', String(1));
			} else {
				localStorage.setItem('streak', String(0));
			}
		}

		//Get current streak.
		streak = parseInt(String(localStorage.getItem('streak')));

		//Set date for tomorrow.
		let tomorrow: any = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		tomorrow = `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()}`;
		localStorage.setItem('tomorrow', tomorrow);
	});

	//Due to rebuttal, get the score localScores, and supabase scores each time this is called.
	$: if (scoresModalActive == true && browser) {
		scores = JSON.parse(String(localStorage.getItem('scores')));
		let previousYesCount = yesCount;
		yesCount = localStorage.getItem('yesCount');
		if (previousYesCount != yesCount) {
			getSupabaseScores(new Date().toLocaleDateString('en-US')).then((result) => {
				supabaseScores = result;
				// Step 1: Get all the scores
				const allScores = Object.values(supabaseScores).map((score) => Number(score));
				let totalSum = 0;
				for (const score of allScores) {
					totalSum += score;
				}

				let scored = Number(yesCount) + 1;
				allScores.splice(scored);
				let scoresBelowSum = 0;
				for (const score of allScores) {
					scoresBelowSum += score;
				}

				scorePercentile = String(Math.round((scoresBelowSum / totalSum) * 100));
				scorePercentile = appendPercentileSuffix(scorePercentile);
			});
		}
	}

	// Share function for sharing thing
	let copied = false;
	async function shareClicked() {
		va.track('share');
		let shareString = '';
		//Make share string more detailed.
		if (browser) {
			let localAnswers = JSON.parse(String(localStorage.getItem('answers')));
			for (let i = 0; i < localAnswers.length; i++) {
				let answer = localAnswers[i].toLowerCase();
				if (answer === 'yes' || answer === 'noyes') {
					shareString += '✔️';
				} else if (answer === 'no' || answer === 'nono') {
					shareString += '❌';
				}
			}
		}

		// Check if Web Share API is supported
		if (navigator.share) {
			try {
				await navigator.share({
					title: 'Groople - ' + date.toLocaleDateString(),
					text: shareString,
					url: 'https://groople.xyz'
				});
			} catch (error) {
				// User cancelled share or error occurred, fall back to clipboard
				navigator.clipboard.writeText(shareString);
				copied = true;
			}
		} else {
			// Fallback to clipboard copy
			navigator.clipboard.writeText(shareString);
			copied = true;
		}
	}

	//Update score in Supabase.
	async function updateSupabaseScore(date: string) {
		//this is first time, so no need to pass previous count.
		let response = await fetch('/api/updateSupabaseScores', {
			method: 'POST',
			body: JSON.stringify({ date, score: yesCount }),
			headers: {
				'content-type': 'application/json',
				accept: 'application/json'
			}
		});
		return await response.json();
	}

	//Get scores from SUPER BASE.
	async function getSupabaseScores(date: string) {
		//this is first time, so no need to pass previous count.
		let response = await fetch(`/api/updateSupabaseScores/?date=${date}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				accept: 'application/json'
			}
		});
		return await response.json();
	}

	//Format percentile to add correct suffix (th, nd, st)
	function appendPercentileSuffix(scorePercentile: string) {
		const lastDigit = parseInt(scorePercentile.slice(-1));
		const secondLastDigit = parseInt(scorePercentile.slice(-2, -1));

		// Special case for 11, 12, and 13
		if (secondLastDigit == 1) {
			return scorePercentile + 'th';
		}

		switch (lastDigit) {
			case 1:
				return scorePercentile + 'st';
			case 2:
				return scorePercentile + 'nd';
			case 3:
				return scorePercentile + 'rd';
			default:
				return scorePercentile + 'th';
		}
	}

	//Simple stuff really.
	let date = new Date();
	let dialog: HTMLDialogElement;
	$: if (dialog && scoresModalActive) dialog.showModal();

	//Chose between seeing your scores, today's scores, or scores of the group
	let youSelected = true;
	let todaySelected = false;

	//handle streak emojis
	let streakEmoji = '';
	$: if (Number(streak) >= 365) {
		streakEmoji = '📅';
	} else if (Number(streak) >= 200) {
		streakEmoji = '✨';
	} else if (Number(streak) >= 100) {
		streakEmoji = '💯';
	} else if (Number(streak) >= 50) {
		streakEmoji = '🌠';
	} else if (Number(streak) >= 25) {
		streakEmoji = '🚀';
	} else if (Number(streak) >= 10) {
		streakEmoji = '🌟';
	} else if (Number(streak) >= 3) {
		streakEmoji = '🔥';
	} else {
		streakEmoji = ''; // default to nothing
	}
</script>

{#if scoresModalActive}
	<dialog
		bind:this={dialog}
		class="bg-neutral-800 text-neutral-100 rounded-lg md:p-8 p-4 drop-shadow-2xl overflow-x-hidden"
	>
		<div class="w-full flex items-center flex-col relative">
			<button
				on:click={() => {
					scoresModalActive = false;
				}}
				class="absolute left-0 w-10 -top-1.5"
				><img
					src="/close-icon.png"
					alt="Close modal"
					class="hover:bg-neutral-700 p-2 rounded-full"
				/></button
			>
			<h2 class="text-xl font-semibold">Play again tomorrow!</h2>
			<h3 class="text-xl flex items-center justify-center gap-2 w-full">
				Score: {yesCount}
			</h3>
			{#if todaySelected}
				<span class="text-lg">{scorePercentile} percentile</span>
			{:else}
				<h3 class="text-lg">Streak: {streak} {streakEmoji}</h3>
			{/if}
		</div>

		<div
			class="2xl:h-[30rem] 2xl:w-[30rem] h-[20rem] w-[20rem] md:h-[25rem] md:w-[25rem] relative mb-12"
		>
			{#if supabaseScores !== null}
				<!-- Buttons for selecting different graphs. -->
				<div class="w-full flex justify-center border-b-2 pt-2 border-neutral-100/20">
					<button
						class="w-1/3 text-sm md:text-base {youSelected
							? 'bg-gradient-to-t from-neutral-100/20 via-neutral-300/10 to-transparent pb-0.5'
							: ''}"
						on:click={() => {
							youSelected = true;
							todaySelected = false;
						}}>You</button
					>
					<button
						class="w-1/3 text-sm md:text-base {todaySelected
							? 'bg-gradient-to-t from-neutral-100/20 via-neutral-300/10 to-transparent pb-0.5'
							: ''}"
						on:click={() => {
							youSelected = false;
							todaySelected = true;
						}}>Today</button
					>
				</div>
			{/if}
			{#if scores !== null && youSelected}
				<ScoreChart sourceData={scores} score={yesCount} />
			{:else if supabaseScores !== null && todaySelected}<ScoreChart
					sourceData={Object.values(supabaseScores)}
					score={yesCount}
				/>
			{/if}
		</div>
		<div class="flex gap-2 justify-center w-full">
			<!-- svelte-ignore a11y-autofocus -->
			<button
				on:click={shareClicked}
				autofocus
				class="p-2 flex justify-center focus:outline-none items-center gap-2 hover:bg-gradient-to-r hover:from-neutral-600 hover:via-neutral-500 hover:to-neutral-600 bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-700 ring-2 ring-neutral-400/60 text-white rounded-md w-full drop-shadow-lg"
				>{!copied ? 'Share' : 'Copied'}<img src="share.svg" alt="share" class="w-5" /></button
			>
			<!-- <a
				href="/create"
				class="bg-neutral-800 hover:bg-neutral-900 text-white ring-1 ring-neutral-500/20 p-2 rounded-md w-full mb-2 text-center"
				>Create a list</a
			> -->
		</div>
	</dialog>
{/if}
