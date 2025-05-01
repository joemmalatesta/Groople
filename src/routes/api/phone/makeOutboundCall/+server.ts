import { supabase } from '$lib/supabaseClient';
import Retell from 'retell-sdk';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RETELL_KEY } from '$env/static/private';
import type { DailyChallenge } from '$lib/types/dailyChallenge';
const retellClient = new Retell({
	apiKey: RETELL_KEY
});

export const POST = (async ({ request }) => {
	const { date, phoneNumber } = await request.json();
	const { data, error } = await supabase.from('dailyChallenge').select().eq('date', date);
	if (!data || data.length < 1) {
		return json({ error: 'No data found' });
	}
	const { letter, categories } = data[0] as DailyChallenge;

	try {
		const call = await retellClient.call.createPhoneCall({
			from_number: '+12025550194',
			to_number: phoneNumber,
			retell_llm_dynamic_variables: {
				letter: letter,
				categories: `1: ${categories[0]}, 2: ${categories[1]}, 3: ${categories[2]}, 4: ${categories[3]}, 5: ${categories[4]}, 6: ${categories[5]}, 7: ${categories[6]}, 8: ${categories[7]}, 9: ${categories[8]}, 10: ${categories[9]}, 11: ${categories[10]}, 12: ${categories[11]}`
			}
		});
		return json({ call });
	} catch (error) {
		return json({ error: 'Error creating call' });
	}
}) satisfies RequestHandler;
