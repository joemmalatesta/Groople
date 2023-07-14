<script>
	import '../app.css';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<header class="flex justify-center items-center flex-col">
	<h1>
		<a
			href="/"
			class="md:text-7xl text-5xl font-semibold text-transparent bg-black bg-clip-text p-3 flex items-center"
		>
			<!-- <img src="svelteLogo.png" alt="Svelte Logo" class="md:w-16 w-12 mr-1" /> -->
			Groople
		</a>
	</h1>
</header>
<slot />
<footer class="flex justify-center mb-3">
	<h4 class="text-sm font-sans">
		Created by <a
			href="https://joemmalatesta.com"
			class="underline underline-offset-2 hover:underline-offset-4 transition-all font-sans">Joe Malatesta</a
		>
	</h4>
</footer>
