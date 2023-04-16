<script lang="ts">
	let categories: string[] = ['meow'];
	let newCategory: string = '';

	function addCateogry() {
		console.log('gopiong');
		categories = [...categories, newCategory];
		console.log(categories);
		newCategory = '';
	}
</script>

<div class="mt-10 flex flex-col items-center justify-center">
	<form class="border-amber-600/60 border-2 rounded-md text-xl">
		<input
			type="text"
			bind:value={newCategory}
			class="w-96 p-2"
			placeholder="New Category"
		/>
		<button
			on:click={addCateogry}
			class=" border-amber-600/60 border-l-2  p-2"
			>Add
		</button>
	</form>
    <div class="flex flex-col">
	{#each categories as category, index}
		<p>{index}. {category}</p>
	{/each}
</div>
    <button class="p-3 text-2xl">Submit List</button>
</div>
