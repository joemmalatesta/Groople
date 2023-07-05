<script lang="ts">
	import { onMount } from "svelte";
    import Category from "./Category.svelte";
    import Scores from "./Scores.svelte";
    import { slide } from "svelte/transition";
    let date = new Date();
    export let categories: string[], letter: string, responseArray: any, localAnswers: any, localInputs: any, answersSubmitted: any, scoresModalActive: boolean;

</script>




<div class="flex justify-center items-center flex-col">
    <p class="md:text-3xl text-xl">{date.toLocaleDateString()}</p>

    <!-- Worry about these always being seen on the phone version -->
    <div
        class="flex items-center justify-between py-4 md:w-1/3 border-b-2 md:border-none sticky md:static top-0 lg:top-auto z-40 px-20 bg-white w-full"
    >
        <h3 class="lg:text-6xl md:text-4xl text-3xl flex flex-col justify-center items-center">
            <p class="text-xl underline-offset-2 underline">Letter</p>
            {letter}
        </h3>
        <!-- Kinda hacky but IDC -->
        <h3 class="lg:text-6xl md:text-4xl text-3xl flex flex-col justify-center items-center">
            <p class="text-xl underline-offset-2 underline">Time</p>
            0
        </h3>
    </div>
    <div class="flex items-center justify-center md:flex-row flex-col w-full relative md:mt-5">
        <div class="flex flex-col mt-5 items-center relative w-full">
            <div class="lg:w-1/2 w-full">
                <!-- Have this here, so the letter is sent with the form details. I'm sure theres a better way -->
                <input type="text" value={letter} class="hidden" name="letter" />
                {#each categories as category, index}
                    {#key responseArray}
                        <div class="my-1 w-full md:border-b-2" in:slide={{ duration: 500 }}>
                            <Category
                                index={index + 1}
                                {category}
                                {letter}
                                valid={localAnswers[index] ? localAnswers[index].trim().toLowerCase() : ''}
                                recordedAnswer={localInputs[index].split(":")[2].trim()}
                                {answersSubmitted}
                            />
                        </div>
                    {/key}
                {/each}
            </div>

            <button
                class="p-2 bg-neutral-800 hover:bg-neutral-900 drop-shadow-md rounded-md text-white md:w-1/2 w-11/12 mb-5"
                on:click={() => {
                    scoresModalActive = true;
                }}>Show Results</button
            >
        </div>
    </div>
</div>
{#if scoresModalActive === true}
    <div class="absolute inset-0 p-2 mt-48 flex justify-center h-fit z-50">
        <Scores bind:scoresModalActive />
    </div>
{/if}