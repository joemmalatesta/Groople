<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let screenWidth: number;

	const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	export let scoreData: number[];
	scoreData = Object.values(scoreData);
	let ctx: any;
	let ctxMd: any;
	const data = {
		labels: labels,
		datasets: [
			{
				axis: 'y',
				label: 'Times Scored',
				data: scoreData,
				fill: false,
				backgroundColor: ['rgba(245, 245, 245, .4)'],
				borderColor: ['rgb(233, 233, 233, .6)'],
				borderWidth: 1
			}
		]
	};
	const config: any = {
		type: 'bar',
		data,
		options: {
			indexAxis: 'y'
		}
	};

	onMount(() => {
		new Chart(ctx, config);
	});
</script>

<canvas bind:this={ctx} height="100%" width="100%" />

<svelte:window bind:innerWidth={screenWidth} />
