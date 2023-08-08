//Get daily challenge details
import { supabase } from '$lib/supabaseClient';

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request }) => {
	const { date } = await request.json();
	let { data, error } = await supabase.from('dailyChallenge').select().eq('date', date);

	//Use silly data if nothing is found
	if (data!.length < 1) {
		console.log(`data not retrieved for ${date}.. using backup shit\nError Message: ${error?.message}\nError Code: ${error?.code}\nError Details: ${error?.details}\nError Hint: ${error?.hint}`);
		data = [
			{
				letter: 'E',
				categories: [
					'Nicknames',
					'Words Associated With Money',
					'Board Games',
					'Things You Plug In',
					'Cosmetics/Toiletries',
					'Presidents',
					'Authors',
					'Types of Drink',
					'Famous Duos and Trios',
					'Things That Have Stripes',
					'College Majors',
					'World Leaders/Politicians'
				]
			}
		];
		return json(data);
	}

	console.log(`game data successfully retrieved for ${date}`)
	return json(data);
}) satisfies RequestHandler;
