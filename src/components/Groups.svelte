<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('meow');
	});

	let email: string = '';

	async function addEmailToWaitlist() {
        console.log(email)

    }


    function validateEmail() {
        
    }
</script>

<h4 class="text-3xl mb-2">Coming soon!</h4>
<div class="flex gap-0 mb-1 rounded-lg">
	<input
		type="email"
		bind:value={email}
		class="w-5/6 p-2 ring-neutral-200/50 ring-1 text-sm text-black placeholder:text-black focus:placeholder:opacity-0 placeholder:opacity-100 placeholder:transition-all rounded-l"
		placeholder="Your email"
	/>
	<button on:click={() => addEmailToWaitlist()} class="p-2 w-1/6 ring-1 ring-neutral-200/50 text-sm md:text-lg bg-neutral-700 hover:bg-neutral-800 rounded-r"> -> </button>
</div>

<p class="text-sm md:text-base">Get notified when groups are ready!</p>
