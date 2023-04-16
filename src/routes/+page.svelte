<svelte:head>
	<title>Scatter Svlete</title>
	<meta name="description" content="" />
</svelte:head>

<div class="h-screen w-screen">
	<div class="flex justify-center items-center flex-col h-1/3 gap-4 bg-gradient-to-t from-neutral-600/50 to-[#f73f0a]/60">
		<h1
			class="md:text-7xl text-5xl font-semibold text-transparent bg-black bg-clip-text p-3 flex items-center"
		>
			<img src="svelteLogo.png" alt="Svelte Logo" class="w-16 mr-1" />cattergories
		</h1>
		<p class="md:text-5xl text-2xl">12 Questions, 120 Seconds, Daily</p>
		<a class="text-2xl p-3 font-semibold rounded-xl bg-[#ee9074] hover:bg-[#e97e5e] shadow-xl ring-orange-600/50 ring-2" href="/daily"
			>Start Daily Challenge</a
		>
		<p class="text-md">Once started, the challenge cannot be stopped.</p>
	</div>
    <div class="flex justify-around h-2/3 w-full">
        <!-- Yesterdays Challenge -->
        <div class="flex flex-col">
            <h3>Yesterdays Challenge</h3>
        </div>
        <!-- Play Daily Challenge -->
        <div>
            Rules
			<ul>
				<li>Descriptive words that don't redefine the answer will be marked Incorrect. E.g "Black Dog" for B.</li>
				<li>Answers may only be submitted once. If you put the same thing for multiple categories, it will only be counted correct one time</li>
				<li>Only one answer is allowed per category. Answering "Nigeria or Nicaragua" for N will be wrong even if it is correct</li>
			</ul>
		</div>
        <!-- Be able to submit as many as you want. up to 50 or something and it will either send an email or store in DB -->
        <div>
            <h3>Submit your own list</h3>
        </div>
    </div>
</div>
