//Get daily challenge details
import { supabase } from '$lib/supabaseClient';

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request }) => {
	const { date } = await request.json();
	//If it says so, add one to the play counter.
	console.log(`Incrementing Score for ${date}`);
	await incrementScore(date);
	return json('success');
}) satisfies RequestHandler;



//Increment tha score!
async function incrementScore(date: string) {
	// Retrieve the existing plays value
	const { data: existingData, error } = await supabase
		.from('dailyChallenge')
		.select('plays')
		.eq('date', date);

	if (error) {
		// Handle error
	} else {
		// Increment the plays locally
		const existingPlays = existingData[0]?.plays;
		const newPlays = existingPlays + 1;

		// Update the plays in the database
		const { data: updatedData, error: updateError } = await supabase
			.from('dailyChallenge')
			.update({ plays: newPlays })
			.eq('date', date);

		if (updateError) {
			// Handle update error
		} else {
			// plays updated successfully
		}
	}
}
