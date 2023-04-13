<script lang="ts">
	export let index: number, category: string, letter: string, valid: string, recordedAnswer: string;
	let answer: string = '';
	let cssOutline: string = '';



	// Validate Based on 
	$: if (answer.toLowerCase().startsWith(letter.toLowerCase()) && answer.length >= 1) {
		cssOutline = 'border-green-500';
	} else if (answer.length == 0) {
		cssOutline = 'border-black';
	} else {
		cssOutline = 'border-red-500';
	}


	let validResponse = ""
	$: if (valid !== ""){
		if (valid === "yes" && answer.toLowerCase().startsWith(letter.toLowerCase())){
			validResponse = "✔️"
		}
		else{
			validResponse = "❌"
		}
	}

	$: if (recordedAnswer === "ZZZZZZ")
	{
		recordedAnswer = "Unanswered"
	}
</script>

<div class="flex justify-between items-center md:flex-row flex-col">
	<label class="p-1 text-xl" for="{index}Input">{index}: {category}</label>
	{#if !recordedAnswer}
		<input
		bind:value={answer}
		type="text"
		placeholder="{letter}..."
		class="focus:outline-none p-1 border-2 {cssOutline} rounded-md"
		name="{index} : {category}"
		id="{index}Input"
	/>
	{:else}
		<p class="text-xl"><span class="underline">{recordedAnswer}</span> {validResponse}</p>
	{/if}
</div>
