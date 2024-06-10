<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

    // onMount(() => {
    //     throw $page.error
    // })
</script>

<h1> Oh hell {$page.error?.message}</h1>