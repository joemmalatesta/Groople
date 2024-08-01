<!-- 
	Chart that is used for showing both local scores, and daily scores from supabase.
 -->

<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let screenWidth: number;

	const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	export let sourceData: number[];
	export let score = 0;
	//could do this with a loop but oh well. 
	let barColors = ['rgba(245, 245, 245, .4)', 'rgba(245, 245, 245, .4)','rgba(245, 245, 245, .4)','rgba(245, 245, 245, .4)','rgba(245, 245, 245, .4)','rgba(245, 245, 245, .4)','rgba(245, 245, 245, .4)','rgba(245, 245, 245, .4)','rgba(245, 245, 245, .4)','rgba(245, 245, 245, .4)','rgba(245, 245, 245, .4)','rgba(245, 245, 245, .4)', 'rgba(245, 245, 245, .4)']
	let borderColors = ['rgb(233, 233, 233, .6)','rgb(233, 233, 233, .6)','rgb(233, 233, 233, .6)','rgb(233, 233, 233, .6)','rgb(233, 233, 233, .6)','rgb(233, 233, 233, .6)','rgb(233, 233, 233, .6)','rgb(233, 233, 233, .6)','rgb(233, 233, 233, .6)','rgb(233, 233, 233, .6)','rgb(233, 233, 233, .6)','rgb(233, 233, 233, .6)','rgb(233, 233, 233, .6)']
	$: barColors[score] = 'rgba(255,255,255)'
	$: borderColors[score] = 'rgba(255,255,255)'
	sourceData = Object.values(sourceData);
	let ctx: any;
	const data = {
		labels: labels,
		datasets: [
			{
				axis: 'y',
				label: "Times Scored",
				data: sourceData,
				fill: false,
				backgroundColor: barColors,
				borderColor: borderColors,
				borderWidth: 1
			}
		]
	};
	const config: any = {
		type: 'bar',
		data,
		options: {
			indexAxis: 'y',
			plugins: {
				legend: {
					display: false
				}
			}
		}
	};

	onMount(() => {
		new Chart(ctx, config);
	});
</script>

<canvas bind:this={ctx} height="100%" width="100%" />

<svelte:window bind:innerWidth={screenWidth} />
