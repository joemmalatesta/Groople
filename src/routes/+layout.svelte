<script>
	import '../app.css';
</script>

<svelte:head>
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://www.groople.xyz/" />
	<meta property="og:title" content="Groople" />
	<meta
		property="og:description"
		content="Answer 12 categories in 100 seconds in todays daily challenge!"
	/>
	<meta property="og:image" content="/opengraph.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://www.groople.xyz/" />
	<meta property="twitter:title" content="Groople" />
	<meta
		property="twitter:description"
		content="Answer 12 categories in 100 seconds in todays daily challenge!"
	/>
	<meta property="twitter:image" content="/opengraph.png" />
</svelte:head>

<header class="flex justify-center items-center flex-col relative">
	<h1>
		<a
			href="/"
			class="md:text-7xl text-5xl font-semibold text-transparent bg-black bg-clip-text p-3 flex items-center"
		>
			<img src="favicon.svg" alt="Groople Logo" class="md:w-28 w-20 mr-1 mt-2" />
			roople
		</a>
	</h1>
</header>
<slot />
<footer class="flex justify-center mb-3">
	<h4 class="text-sm font-sans">
		Created by <a
			href="https://joemmalatesta.com"
			class="underline underline-offset-2 hover:underline-offset-4 transition-all font-sans"
			>Joe Malatesta</a
		>
	</h4>
</footer>
