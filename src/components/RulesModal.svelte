<script lang="ts">
	import { slide } from 'svelte/transition';
	//Rules for the modal.
	const rules = [
		{
			rule: 'Descriptive words must distinctly change the answer',
			examples: ['"Black Dog" = ❌', '"Black Ice" = ✔️']
		},
		{
			rule: 'You may only use answers one time',
			examples: ['1. "Apple": ✔️', '2. "Apple" = ❌']
		},
		{
			rule: 'Multiple answers are not allowed',
			examples: ['"Apple or Avocado" = ❌', '"Apple" = ✔️']
		}
	];

	export let modalActive: boolean = true;
	let showExamples = [false, false, false];
</script>

<div class=" bg-neutral-800 text-neutral-100 ring-neutral-500 ring-2 rounded-lg p-4">
	<!-- How to Play -->
	<div class="flex justify-center mb-2">
		<h1 class="text-2xl font-bold underline underline-offset-4">How to Play</h1>
	</div>
	<div class="flex flex-col items-start text-xl">
		<p>•Answer with something in the category, starting with given letter</p>
		<p>•A Red outline is an automatic ❌</p>
		<p>•Answers are judged by AI and either given a ✔️ or ❌</p>
		
	</div>

	<!-- RULES -->
	<div class="flex justify-center my-2">
		<h1 class="text-2xl font-bold underline underline-offset-4">Rules</h1>
	</div>
	<div class="flex flex-col items-start">
		{#each rules as rule, index}
			<h4 class="md:text-xl text-lg md:font-semibold">• {rule.rule}</h4>
			<button
				class="underline underline-offset-2 hover:underline-offset-4 transition-all"
				title="Show Examples"
				on:click={() => {
					showExamples[index] = !showExamples[index];
				}}>{!showExamples[index] ? 'Show Examples' : 'Hide Examples'}</button
			>

			<!-- If examples selected -->
			{#if showExamples[index]}
				{#key showExamples[index]}
					<ul transition:slide>
						{#each rule.examples as example}
							<li>{example}</li>
						{/each}
					</ul>
				{/key}
			{/if}
		{/each}
	</div>
	<div class="flex justify-center items-center m-3">
		<button
			class="p-2  hover:bg-[#ff5100] bg-[#ff5e00] text-black drop-shadow-lg rounded-md"
			on:click={() => {
				modalActive = !modalActive;
			}}>Start Daily Challenge</button
		>
	</div>
</div>
