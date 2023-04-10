<script lang="ts">
    export let index: number, category: string, letter: string
    let answer: string = ""
    let cssOutline: string = ""

    $: if (answer.toLowerCase().startsWith(letter.toLowerCase()) && answer.length>=1)
    {
        cssOutline = "border-green-500"
    }
    else if (answer.length==0){
        cssOutline = "border-black"
    }
    else{ cssOutline = "border-red-500"}
</script>

<div class="flex justify-between items-center">
<label class="p-1 text-xl" for="{index}Input">{index} {category}</label>
<!-- Should be a component -->
<input bind:value={answer} type="text" placeholder="{letter}..." class="focus:outline-none  p-1 border-2 {cssOutline} rounded-md" name="answerInput" id="{index}Input">
</div>