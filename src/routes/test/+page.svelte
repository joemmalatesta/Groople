<script lang="ts">
	import Chart from '../../components/ScoreChart.svelte';
	import ScoreChart from '../../components/ScoreChart.svelte';
	let scoreData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
</script>

<div class="flex justify-center items-center outline">
	<ScoreChart {scoreData} />
</div>
