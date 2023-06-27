<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	let scores: any = null;
    let yesCount: any
	export let shareString: string;
    let scoresModalActive: boolean
	onMount(() => {
		scoresModalActive = true
		if (browser === true) {
			scores = JSON.parse(String(localStorage.getItem('scores')));
            yesCount = localStorage.getItem("yesCount")
			console.log(scores);
		}
	});
	let shared: boolean = false;
	function shareClicked() {
		navigator.clipboard.writeText(shareString);
		shared = true;
	}
</script>


{#if scoresModalActive}
<div
	class=" bg-gradient-to-b from-neutral-700 to-neutral-800 text-neutral-100 ring-neutral-500 ring-2 rounded-lg md:p-8 p-2 drop-shadow-2xl"
>  
    <h2 class="text-center text-2xl">Score: {yesCount}</h2>
	{#if scores !== null}
		<div class="grid grid-cols-3">
			<h3 class="col-span-3">Score Distribution</h3>
			{#each Object.entries(scores).reverse() as [key, value]}
				<p>{key}: {value}</p>
			{/each}
		</div>
	{/if}
	<div class="flex flex-col justify-center w-full">
		<button
			on:click={shareClicked}
			class="bg-neutral-800 hover:bg-neutral-900 text-white drop-shadow-md p-2 rounded-md w-full mb-2"
			>{!shared ? 'Share' : 'Copied to Clipboard'}</button
		>
		<a
			href="/create"
			class="bg-neutral-800 hover:bg-neutral-900 text-white drop-shadow-md p-2 rounded-md w-full mb-2 text-center"
			>Create your own list!</a
		>
        <button
			on:click={() => {
                scoresModalActive = false
            }}
			class="bg-neutral-800 hover:bg-neutral-900 text-white drop-shadow-md p-2 rounded-md w-full mb-3"
			>Dismiss</button
		>
	</div>
</div>
{/if}