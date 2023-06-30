<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import ScoreChart from './ScoreChart.svelte';
	let scores: any = null;
    let yesCount: any
	export let shareString: string;
    export let scoresModalActive: boolean

	onMount(() => {
		scoresModalActive = true
		if (browser === true) {
			scores = JSON.parse(String(localStorage.getItem('scores')));
            yesCount = localStorage.getItem("yesCount")
			console.log(scores);
		}
	});


	// Share function for thing
	let shared: boolean = false;
	function shareClicked() {
		navigator.clipboard.writeText(shareString);
		shared = true;
	}


	let date = new Date();
	$: shareString = `Scattergories\n${date.toLocaleDateString()}\n${yesCount}✔️ ${12-yesCount}❌`;


</script>


{#if scoresModalActive}
<div
	class="bg-gradient-to-b from-neutral-700 to-neutral-800 text-neutral-100 ring-neutral-500 ring-2 rounded-lg md:p-8 p-4 drop-shadow-2xl"
>  
    <h2 class="text-center text-2xl">Score today: {yesCount}</h2>
	{#if scores !== null}
		<div class="md:h-[30rem] md:w-[30rem] h-[20rem] w-[20rem]">
			<ScoreChart scoreData={scores}/>
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
                scoresModalActive = false
            }}
			class="w-full underline-offset-2 underline hover:underline-offset-4 transition-all text-sm md:text-base"
			>Dismiss</button
		>
</div>
{/if}