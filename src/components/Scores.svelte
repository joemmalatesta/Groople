<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import ScoreChart from './ScoreChart.svelte';
	let scores: any = null;
	let yesCount: any;
	export let scoresModalActive: boolean;
	let streak: number | null;

	onMount(() => {
		scoresModalActive = true;
		// Get scores and todays score
		scores = JSON.parse(String(localStorage.getItem('scores')));
		yesCount = localStorage.getItem('yesCount');

		//Set played for today
		let currentDate: any = new Date();
		currentDate = `${currentDate.getFullYear()}-${
			currentDate.getMonth() + 1
		}-${currentDate.getDate()}`;
		localStorage.setItem('lastPlayed', currentDate);

		//Make a streak if there isn't one
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
		else if (currentDate != localStorage.getItem('tomorrow')){
			if (yesCount > 0){
				localStorage.setItem('streak', String(1));
			}
			else{
				localStorage.setItem('streak', String(0));
			}
		}

		streak = parseInt(String(localStorage.getItem('streak')));

		//Set date for tomorrow.
		let tomorrow: any = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		tomorrow = `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()}`;
		localStorage.setItem('tomorrow', tomorrow);
	});

	//Due to rebuttal, get the score and scores each time this is shown
	$: if (browser && scoresModalActive == true){
		scores = JSON.parse(String(localStorage.getItem('scores')));
		yesCount = localStorage.getItem('yesCount');
	}

	// Share function for thing
	let shared: boolean = false;
	function shareClicked() {
		navigator.clipboard.writeText(shareString);
		shared = true;
	}

	let date = new Date();
	$: shareString = `Groople\n${date.toLocaleDateString()}\n${yesCount}✔️ ${12 - yesCount}❌`;
</script>

{#if scoresModalActive}
	<div
		class="bg-gradient-to-b from-neutral-700 to-neutral-800 text-neutral-100 ring-neutral-500 ring-2 rounded-lg md:p-8 p-4 drop-shadow-2xl"
	>
		<div class="w-full flex items-center flex-col">
			<h2 class="text-2xl">Score today: {yesCount}</h2>
			<h2 class="text-lg">Streak: {streak}{Number(streak) >= 10 ? ' 🔥' : ''}</h2>
		</div>
		{#if scores !== null}
			<div class="md:h-[30rem] md:w-[30rem] h-[20rem] w-[20rem]">
				<ScoreChart scoreData={scores} />
			</div>
		{/if}
		<div class="flex gap-2 justify-center w-full">
			<button
				on:click={shareClicked}
				class="bg-neutral-800 hover:bg-neutral-900 text-white ring-1 ring-neutral-500/20 p-2 rounded-md w-full mb-2"
				>{!shared ? 'Share' : 'Copied!'}</button
			>
			<a
				href="/create"
				class="bg-neutral-800 hover:bg-neutral-900 text-white ring-1 ring-neutral-500/20 p-2 rounded-md w-full mb-2 text-center"
				>Create a list</a
			>
		</div>
		<button
			on:click={() => {
				scoresModalActive = false;
			}}
			class="w-full underline-offset-2 underline hover:underline-offset-4 transition-all text-sm md:text-base"
			>Dismiss</button
		>
		</div>
{/if}
