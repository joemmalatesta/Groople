<script lang="ts">
	let categories: string[] = ["", "", "", "","","","","","","","",""];
	let newCategory: string = '';
	$: console.log(categories)
</script>

<div class="md:mt-10 mt-2 flex flex-col md:mx-64 mx-5">
	<h1 class="text-4xl">Create A List</h1>
	<form class="flex flex-col w-full">
		<div class="flex flex-col md:flex-row md:items-center md:gap-2 my-2">
		<input type="text" placeholder="Your name here" class="md:my-2 border-2 p-1">
		<p>For a shoutout if your list is used</p>
	</div>
		{#each categories as category, index}
		<div class="gap-2 flex items-center border-b-2 border-amber-600/60 text-xl m-1 w-full">
		<label for="Submission {index + 1}">{index + 1}.</label>
			<input
			name="Submission {index + 1}"
			type="text"
			bind:value={categories[index]}
			class="w-full p-2"
			placeholder="New Category"
		/>
	</div>
		{/each}
		
	</form>
    <div class="flex flex-col">
</div>
    <button class="px-3 py-1 bg-amber-600/60 border-amber-600/60 hover:bg-amber-600/70 text-2xl border-2 rounded-md w-full">Submit List</button>
</div>

