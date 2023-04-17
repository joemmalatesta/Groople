<script lang="ts">
	import { slide } from 'svelte/transition';
		//Rules for the modal.
        const rules = [
		{
			rule: 'Thou shall not fart',
			examples: ['Cool stuff: X', 'Apple: Check']
		},
		{
			rule: 'Thou shall not seek funds from the government',
			examples: ['Cool stuff: X', 'Apple: Check']
		},
		{
			rule: 'Words cannot be wrong...',
			examples: ['Cool stuff: X', 'Apple: Check']
		}
	];
    
	export let modalActive: boolean = true;
	let showExamples = [false, false, false];
</script>

<div class=" bg-neutral-800 text-neutral-100 ring-neutral-500 ring-2 rounded-lg p-4">
<div
	class="flex flex-col items-start"
>
	{#each rules as rule, index}
		<h4 class="text-2xl font-semibold">• {rule.rule}</h4>
		<button
			class="underline"
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
        class="p-2 bg-gradient-to-r from-orange-400/90 to-orange-600/90 text-black hover:from-orange-400/70 hover:to-orange-600/70 rounded-md"
		on:click={() => {
			modalActive = !modalActive;
		}}>Start Daily Challenge</button
	>
</div>
</div>