<script lang="ts">
	import { onMount } from 'svelte';



	let email: string = '';
    let errorMessage: string = 'Something went wrong'
	let showErrorMessage: boolean = false;
    let addEmailResponse: string = ""
    let successfullyAdded: boolean = false

	async function addEmailToWaitlist() {
		showErrorMessage = false;
		if (!validateEmail()) {
            errorMessage = "Enter valid email"
			showErrorMessage = true;
            return
		}
        let apiResponse = ""
        const response = await fetch('/api/addEmailToWaitlist', {
            method: 'POST',
            body: JSON.stringify({email}),
            headers: {
                'content-type': 'application/json',
				accept: 'application/json'
            }
        })
        //Parse response from server and update UI with it.
        apiResponse = await response.json()
        if (apiResponse == 'success'){
            successfullyAdded = true
        }
        else{
            errorMessage = apiResponse
            showErrorMessage = true
            return
        }
	}

	function validateEmail() {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
</script>

{#if !successfullyAdded}
<div class="flex justify-center items-center flex-col">
<h4 class="text-3xl">Coming soon!</h4>
<h6 class="text-lg mb-2 text-center">Create custom groups to see all your friends scores</h6>
</div>
<form class="flex gap-0 mb-1 rounded-lg">
	<input
		type="email"
        name="email"
		bind:value={email}
		class="w-5/6 p-2 ring-neutral-200/50 ring-1 text-sm text-black placeholder:text-black focus:placeholder:opacity-0 placeholder:opacity-100 placeholder:transition-all rounded-l"
		placeholder="Your email"
	/>
	<button
		on:click={() => addEmailToWaitlist()}
		class="p-2 w-1/6 ring-1 ring-neutral-200/50 text-sm md:text-lg bg-neutral-700 hover:bg-neutral-800 rounded-r"
	>
		>
	</button>
</form>
{#if showErrorMessage}
	<p class="text-red-500 text-xs">{errorMessage}</p>
{/if}

<p class="text-sm md:text-base">Get notified when groups are ready!</p>

{:else}
<div class="flex flex-col justify-center items-center gap-3">
    <h4 class="md:text-3xl text-2xl">You're in the know!</h4>
    <p class="text-base text-center">You'll be among the first to know when you can join up with your friends!</p>
    <p class="text-xs">(also I'll always remember you ❤️)</p>
</div>
{/if}
