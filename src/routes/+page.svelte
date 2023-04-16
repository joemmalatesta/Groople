<script>
	import RuleCard from "../components/RuleCard.svelte";

	let rules = [
		`Descriptive words that don't redefine the answer will be marked Incorrect. E.g "Black Dog" for B.`,
		`Answers may only be submitted once. If you put the same thing for multiple categories, it will only be counted correct one time`,
		`Only one answer is allowed per category. Answering "Nigeria or Nicaragua" for N will be wrong even if it is correct`
	];
</script>

<svelte:head>
	<title>Scatter Svlete</title>
	<meta name="description" content="" />
</svelte:head>

<main class="h-screen w-screen">
	<div
		class="flex justify-center items-center flex-col h-1/3 gap-4 bg-gradient-to-t from-neutral-600/50 to-[#f73f0a]/60"
	>
		<h1
			class="md:text-7xl text-5xl font-semibold text-transparent bg-black bg-clip-text p-3 flex items-center"
		>
			<img src="svelteLogo.png" alt="Svelte Logo" class="w-16 mr-1" />cattergories
		</h1>
		<p class="md:text-4xl text-2xl">12 Questions, 120 Seconds, Daily</p>
		<a
			class="text-4xl p-3 font-semibold rounded-xl bg-[#ee9074] hover:bg-[#e97e5e] shadow-xl ring-orange-600/50 ring-2"
			href="/daily">Play Daily Challenge</a
		>
		<p class="text-md">Once started, the challenge cannot be stopped.</p>
	</div>
	<!-- RULES -->
	<div class="flex justify-around items-center h-1/3 bg-neutral-600/50">
		{#each rules as rule}
			<RuleCard rule={rule} />
		{/each}
	</div>
	<!-- OTHER OPTIONS -->
	<div class="flex justify-around items-center h-1/3 bg-gradient-to-b from-neutral-600/50 to-[#f73f0a]/60">
		<div class="flex flex-col itmes-center text-3xl">
			<a href="create">Create your own list</a>
			
		</div>
		<div class="flex flex-col itmes-center text-3xl">
			<label for="">Join A group</label>
			<input type="text" placeholder="Group ID" class="p-1 rounded-md">
		</div>
	</div>
</main>
