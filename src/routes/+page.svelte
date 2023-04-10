<script lang="ts">
	const categories: string[] = [
		'Animals',
		'Things found in a classroom',
		'Types of vehicles',
		'Breakfast foods',
		'Famous athletes',
		'Fictional characters',
		'Things that are round',
		'Musical instruments',
		'Tourist attractions',
		'College majors',
		'Things found in a park',
		'Types of fabric'
	];
    let letter = "M"
    let answer = true
</script>

<div class="flex justify-center items-center flex-col">
	<h1 class="text-6xl">SvelteGories</h1>
	<ul class="flex flex-col">
		{#each categories as  category, index}
			<li class="p-1 text-xl">{index} {category}</li>
            <!-- Should be a component -->
            <input bind:value={answer} type="text" placeholder="{letter}..." class="p-1 border-red-400 border-2 rounded-md">
		{/each}
	</ul>
</div>
