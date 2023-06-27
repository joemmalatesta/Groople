<script lang="ts">

	export let index: number, category: string, letter: string, valid: string, recordedAnswer: string, modalActive: boolean, answersSubmitted: boolean;
	let answer: string = '';
	let cssOutline: string = '';



	// Validate Based on 
	$: if (answer.toLowerCase().startsWith(letter.toLowerCase()) && answer.length >= 1) {
		cssOutline = 'border-green-500/80';
	} else if (answer.length == 0) {
		cssOutline = 'border-neutral-800/80';
	} else {
		cssOutline = 'border-red-500/80';
	}


	let validResponse = ""
	//Use recorded answer instead of answer in order to uhhh cuz answer gets deleted IDK why
	$: if (valid !== ""){
		if (valid === "yes" && recordedAnswer.toLowerCase().startsWith(letter.toLowerCase())){
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

	console.log(recordedAnswer, answersSubmitted)

</script>

<div class="flex md:justify-between items-start mx-6 md:mx-0 md:items-center sm:flex-row flex-col">
	<label class="p-1 text-xl" for="{index}Input">{index}: {category}</label>
	{#if !recordedAnswer && answersSubmitted}
		<img src="loading.svg" alt="response loading" class="md:w-20 w-10 h-8">
	{:else if !recordedAnswer}
		<input
		bind:value={answer}
		type="text"
		placeholder="{letter}..."
		class="focus:outline-none p-1 border-2 {cssOutline} rounded-md w-full md:w-fit"
		name="{index} : {category}"
		id="{index}Input"
		autocomplete="off"
		spellcheck="true"
	/>

	{:else}
		<p class="text-xl"><span class="underline">{recordedAnswer}</span> {validResponse}</p>
	{/if}
</div>