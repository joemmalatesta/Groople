import { supabase } from '$lib/supabaseClient';
import Retell from 'retell-sdk';
import { fail } from '@sveltejs/kit';
import { RETELL_KEY, RETELL_PHONE_NUMBER } from '$env/static/private';
import type { DailyChallenge } from '$lib/types/dailyChallenge';
import type { Actions } from './$types';

const retellClient = new Retell({
	apiKey: RETELL_KEY
});

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const formDataObj = Object.fromEntries(data.entries());
		console.log('Full form data received:', formDataObj);

		const date = data.get('date')?.toString();
		const phoneNumber = data.get('phoneNumber')?.toString();
		console.log('Extracted date:', date);
		console.log('Extracted phone:', phoneNumber);

		if (!date || !phoneNumber) {
			return fail(400, { error: 'Missing required fields' });
		}

		const { data: challengeData, error } = await supabase
			.from('dailyChallenge')
			.select()
			.eq('date', date);
		if (error) {
			console.error('Database error:', error);
		}

		if (!challengeData || challengeData.length < 1) {
			console.log('no data found');
			return fail(404, { error: 'No data found' });
		}

		const { letter, categories } = challengeData[0] as DailyChallenge;

		try {
			console.log('trying call');
			const call = await retellClient.call.createPhoneCall({
				from_number: RETELL_PHONE_NUMBER,
				to_number: formatPhoneNumber(phoneNumber),
				retell_llm_dynamic_variables: {
					date: date,
					letter: letter,
					categories: `1: ${categories[0]}, 2: ${categories[1]}, 3: ${categories[2]}, 4: ${categories[3]}, 5: ${categories[4]}, 6: ${categories[5]}, 7: ${categories[6]}, 8: ${categories[7]}, 9: ${categories[8]}, 10: ${categories[9]}, 11: ${categories[10]}, 12: ${categories[11]}`
				}
			});
			console.log('call created to', phoneNumber);
			return { success: true, call };
		} catch (error) {
			console.error(error);
			return fail(500, { error: 'Error creating call' });
		}
	}
} satisfies Actions;

function formatPhoneNumber(phoneNumber: string) {
	return `+1${phoneNumber.replace(/\D/g, '')}`;
}
