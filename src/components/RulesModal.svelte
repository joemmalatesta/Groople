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

<div class=" bg-gradient-to-b from-neutral-700 to-neutral-800 text-neutral-100 ring-neutral-500 ring-2 rounded-lg md:p-12 p-2 drop-shadow-2xl">
	<!-- How to Play -->
	<h1 class="md:text-2xl text-xl font-bold underline underline-offset-4">How to Play</h1>
	<div class="flex flex-col items-start text-sm md:text-xl">
		<p>•Answer with something in the category, starting with the given letter</p>
		<p>•A Red outline is an automatic ❌</p>
		<p>•Answers are judged by AI and either given a ✔️ or ❌</p>
	</div>

	<!-- RULES -->
	<h1 class="md:text-2xl text-xl font-bold underline underline-offset-4">Rules</h1>
	<div class="flex flex-col items-start">
		{#each rules as rule, index}
			<h4 class="md:text-xl text-sm md:font-semibold">• {rule.rule}</h4>
			<button
				class="md:text-base text-xs underline underline-offset-2 hover:underline-offset-4 transition-all"
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
							<li class="text-sm md:text-base">{example}</li>
						{/each}
					</ul>
				{/key}
			{/if}
		{/each}
	</div>
	<div class="flex justify-center items-center m-3">
		<button
			class="p-2 hover:bg-neutral-900 bg-neutral-800  ring-2 ring-neutral-500/20 text-white rounded-md"
			on:click={() => {
				modalActive = !modalActive;
			}}>Start Daily Challenge</button
		>
	</div>
</div>
