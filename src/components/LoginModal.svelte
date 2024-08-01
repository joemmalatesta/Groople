<!-- This component is the opening modal for people who have already played before. 
    This is like the rules modal, but it has the option to create your own list, and view rules only if you want.
-->

<script lang="ts">
	let showRules = false;
	export let modalActive = true;

	let dialog: HTMLDialogElement;
	$: if (dialog && modalActive) dialog.showModal();

	let loginWithUsername = false;
	let signUpSelected = false;
	let buttonText = 'Login';
	function signUp() {
		console.log('switch to signing up. ');
		signUpSelected = true;
		buttonText = 'Sign up';
	}

	function loginWithGoogle() {
		console.log('logging in with google');
		// call supabase to login with google.
	}
</script>

<dialog
	bind:this={dialog}
	class=" bg-neutral-800 text-neutral-100 rounded-lg md:p-12 p-2 drop-shadow-2xl flex flex-col gap-1"
>
	<h3 class="text-lg text-center md:text-xl mb-0.5">{signUpSelected ? "Sign Up" : 'Login'}</h3>
	<p class="text-sm">
		Login or <span
			><button
				on:click={signUp}
				class="underline underline-offset-2 hover:underline-offset-4 transition-all">sign up</button
			></span
		> to get unlimited rebuttals
	</p>
	{#if !loginWithUsername}
		<button
			type="button"
			class="p-2 hover:bg-neutral-500 bg-neutral-700 ring-2 ring-neutral-800 text-white rounded-md drop-shadow-lg text-center mt-0.5"
			on:click={() => {
				loginWithGoogle();
			}}>Login with google</button
		>
		<button
			type="button"
			class="p-2 hover:bg-neutral-500 bg-neutral-700 ring-2 ring-neutral-800 text-white rounded-md drop-shadow-lg text-center mt-0.5"
			on:click={() => {
				loginWithUsername = true;
			}}>Login with username</button
		>
	{/if}
	{#if loginWithUsername}
		<form class="flex justify-center items-center flex-col gap-1 ">
			<div>
				<p class="text-sm">username</p>
				<input type="text" class="rounded-sm" />
			</div>
			<div>
				<p class="text-sm">password</p>
				<input type="text" class="rounded-sm" />
			</div>
			<button
			class="w-full p-2 hover:bg-neutral-500 bg-neutral-700 ring-2 ring-neutral-800 text-white rounded-md drop-shadow-lg text-center mt-0.5"
			>Login</button
		>
		</form>
	{/if}
	<div class="w-full justify-center flex">
		<!-- svelte-ignore a11y-autofocus -->
		<button
			type="button"
			autofocus
			class="text-sm w-fit p-2 underline underline-offset-2 hover:underline-offset-4 transition-all text-center mt-0.5 focus:outline-none"
			on:click={() => {
				modalActive = !modalActive;
			}}>not now</button
		>
	</div>
</dialog>
