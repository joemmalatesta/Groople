//Get daily challenge details
import { supabase } from '$lib/supabaseClient';

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { get } from 'svelte/store';


//Set new scores, or update list of scores
export const POST = (async ({ request }) => {
	const { date, score, previousScore } = await request.json();
	let response = await updateScores(date, score, previousScore);
	return json(response);
}) satisfies RequestHandler;


//Get scores.. simple enough.
export const GET = (async ({ request, url }) => {
	let date = url.searchParams.get('date') as string
    return json(await getScores(date))
}) satisfies RequestHandler;





async function updateScores(date: string, score: number, previousScore?: number) {
    if (score > 12 || score < 0){
        console.log('invalid score submitted')
        return json("invalid score")
    }
	console.log(`Scores being changed for ${date}. Adding to ${score} and removing from ${previousScore ? previousScore: "nothing"}`)

	// Retrieve the existing scores value
	const { data: existingData, error } = await supabase
		.from('dailyChallenge')
		.select('scores')
		.eq('date', date);

	if (error) {
		console.log(`Was not able to retrieve scores for ${date}\nError: ${error}`)
		return json('failure')
	} else {
		// Increment the plays locally
		const existingScores = existingData[0]?.scores;
		existingScores[score] += 1
		if (previousScore){
			existingScores[previousScore] -= 1
		}
		// Update the plays in the database
		const { data: updatedData, error: updateError } = await supabase
			.from('dailyChallenge')
			.update({ scores: existingScores })
			.eq('date', date);

		if (updateError) {
			console.log(`Was not able to update scores for ${date}\nError: ${updateError}`)
			return json('failure')
		} else {
			console.log(`Scores for ${date} updated.`)
			return json("success")
		}
	}
}





async function getScores(date: string) {
	// Retrieve the existing scores value
	const { data, error } = await supabase
		.from('dailyChallenge')
		.select('scores')
		.eq('date', date);

	if (error) {
		console.log(`Was not able to retrieve scores for ${date}\nError: ${error.message}`)
		return json('failure')
	}else{
			console.log(`retrieved scores for ${date}`)
			return data[0]?.scores;
		}
	};

