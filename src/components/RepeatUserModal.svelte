<!-- This component is the opening modal for people who have already played before. 
    This is like the rules modal, but it has the option to create your own list, and view rules only if you want.
-->

<script lang="ts">
	import RulesModal from "./RulesModal.svelte";

    let showRules = false
	export let modalActive = true;
	export let letter: string;

	let dialog: HTMLDialogElement;
	$: if (dialog && modalActive) dialog.showModal();
</script>

<dialog
	bind:this={dialog}
	class=" bg-neutral-800 text-neutral-100 rounded-lg md:p-12 p-2 drop-shadow-2xl flex flex-col gap-1"
>
    <h3 class="text-lg text-center md:text-xl mb-2">Welcome back!</h3>
	<button
		type="button"
		class="p-1 hover:bg-neutral-500 bg-neutral-700 ring-2 ring-neutral-800 text-white rounded-md drop-shadow-lg text-center my-0.5"
		on:click={() => {
			showRules = !showRules;
		}}>How to play</button
	>
	<a
		href='/create'
		class="p-1 hover:bg-neutral-500 bg-neutral-700 ring-2 ring-neutral-800 text-white rounded-md drop-shadow-lg text-center my-0.5"
		>Create a list</a
	>
	<!-- <a
		href='/infinite'
		class="p-1 hover:bg-neutral-500 bg-neutral-700 ring-2 ring-neutral-800 text-white rounded-md drop-shadow-lg text-center my-0.5"
		>Play Infinite</a
	> -->
	<!-- <a
		href='/blitz'
		class="p-1 hover:bg-neutral-500 bg-neutral-700 ring-2 ring-neutral-800 text-white rounded-md drop-shadow-lg text-center my-0.5"
		>Play Blitz</a
	> -->
	<!-- svelte-ignore a11y-autofocus -->
	<button
		type="button"
		autofocus
		class="p-2 hover:bg-neutral-500 bg-neutral-700 ring-2 ring-neutral-800 text-white rounded-md drop-shadow-lg text-center mt-0.5 focus:outline-none"
		on:click={() => {
			modalActive = !modalActive;
		}}>Start Daily Challenge</button
	>
</dialog>
{#if showRules}
<RulesModal  bind:modalActive={showRules} {letter} buttonText={"Okay"}/>
{/if}
