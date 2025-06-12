<script>
	import '../app.css';
</script>

<svelte:head>
	<!-- Basic Meta Tags -->
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- Favicon and Icons -->
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="icon" href="/apple-touch-icon.png" sizes="180x180" />
	<link rel="icon" href="/favicon.ico" sizes="32x32" />

	<!-- Essential Open Graph Meta Tags (Static) -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Groople" />
	<meta property="og:locale" content="en_US" />

	<!-- Default Open Graph / Facebook -->
	<meta property="og:title" content="Groople - Daily Category Challenge" />
	<meta property="og:url" content="https://www.groople.xyz/" />
	<meta
		property="og:description"
		content="Answer 12 categories in 100 seconds in today's daily challenge! Test your knowledge and beat your friends' scores."
	/>
	<meta property="og:image" content="https://www.groople.xyz/opengraph.png" />
	<meta property="og:image:secure_url" content="https://www.groople.xyz/opengraph.png" />
	<meta property="og:image:alt" content="Groople - Daily Category Challenge Game" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:type" content="image/png" />

	<!-- Default Twitter Cards -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@groople" />
	<meta name="twitter:creator" content="@joemalatesta" />
	<meta name="twitter:title" content="Groople - Daily Category Challenge" />
	<meta
		name="twitter:description"
		content="Answer 12 categories in 100 seconds in today's daily challenge! Test your knowledge and beat your friends' scores."
	/>
	<meta name="twitter:url" content="https://www.groople.xyz/" />
	<meta name="twitter:image" content="https://www.groople.xyz/opengraph.png" />
	<meta name="twitter:image:alt" content="Groople - Daily Category Challenge Game" />

	<!-- Additional meta for better sharing -->
	<meta
		name="description"
		content="Answer 12 categories in 100 seconds in today's daily challenge! Test your knowledge and beat your friends' scores."
	/>
	<meta name="author" content="Joe Malatesta" />
	<meta
		name="keywords"
		content="word game, daily challenge, trivia, categories, brain game, puzzle"
	/>
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
