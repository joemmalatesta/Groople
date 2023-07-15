<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';

	let categories: string[] = ['', '', '', '', '', '', '', '', '', '', '', ''];
	let newCategory: string = '';
	export let form;
</script>

<svelte:head>
	<title>Create New List</title>
</svelte:head>

<div class="md:mt-10 mt-2 flex flex-col lg:mx-64 xl:mx-80 mx-5">
	<h1 class="text-4xl">Create A List</h1>
	{#if form?.output == 'no categories'}
		<p class="text-red-500 text-sm">Must submit at least 1 category</p>
	{/if}
	<form class="flex flex-col w-full" method="POST" use:enhance>
		<div class="flex flex-col w-fit md:gap-2 my-2">
			<input
				type="text"
				name="name"
				placeholder="Your name here"
				class="mt-2 border-2 p-1 rounded-md"
			/>

			<p class="text-sm">For a shoutout if your list is used</p>
		</div>
		{#each categories as category, index}
			<div class="gap-2 flex items-center border-b-2 text-xl m-1 w-full">
				<label for="submission {index + 1}">{index + 1}.</label>
				<input
					name="submission {index + 1}"
					type="text"
					bind:value={categories[index]}
					class="w-full p-2"
					placeholder="New Category"
				/>
			</div>
		{/each}
		<button
			class="px-3 py-1 mb-5 bg-neutral-800 hover:bg-neutral-900 text-2xl border-2 rounded-md w-full text-white"
			>{form?.output == 'success' ? "Submitted!" :"Submit List"}</button
		>
	</form>
</div>
