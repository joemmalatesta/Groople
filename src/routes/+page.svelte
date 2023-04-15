<svelte:head>
	<title>Deez</title>
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
            I dont know what will go here
		</div>
        <!-- Be able to submit as many as you want. up to 50 or something and it will either send an email or store in DB -->
        <div>
            <h3>Submit your own list</h3>
        </div>
    </div>
</div>
