<script lang="ts">
	export let time = 120;
	let alertTime = false;
	const interval = setInterval(function () {
			//If out of time, run animate saying "Time's up."
			//AlertTime is used because text needs to be replaced before the second animateRefresh call for actual refreshing
			if (time === 0) {
				clearInterval(interval);
				alertTime = true;
			} else {
				time--;
			}
		}, 1000);
</script>

{time}
