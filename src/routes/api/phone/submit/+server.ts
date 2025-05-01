import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { OPENAI_KEY } from '$env/static/private';
import { mainModel } from '$lib/constants';
import { DailyChallenge } from '$lib/types/dailyChallenge';
import { createPrompt } from '$lib/constants';
import { Configuration, OpenAIApi } from 'openai';

const openAI = new OpenAIApi(
	new Configuration({
		apiKey: OPENAI_KEY
	})
);

export const POST = (async ({ request }) => {
	const {
		date,
		answer1,
		answer2,
		answer3,
		answer4,
		answer5,
		answer6,
		answer7,
		answer8,
		answer9,
		answer10,
		answer11,
		answer12
	} = await request.json();

	// Get challenge data from supabase
	const { data } = (await supabase.from('dailyChallenge').select().eq('date', date)) as {
		data: DailyChallenge[];
	};

	if (!data || data.length === 0) {
		return json({ error: 'No challenge data found' });
	}

	const categories = data[0].categories;
	const letter = data[0].letter;
	const answers = [
		answer1,
		answer2,
		answer3,
		answer4,
		answer5,
		answer6,
		answer7,
		answer8,
		answer9,
		answer10,
		answer11,
		answer12
	];

	// Create the prompt with all answers and categories
	const promptData = answers
		.map((answer, index) => `${index + 1}: ${categories[index]}: ${answer}`)
		.join('\n');

	console.log(promptData);
    const prompt = createPrompt(promptData, letter);
	try {
		const res = await openAI.createChatCompletion({
            model: mainModel,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ]
        });

		const result = res.data.choices[0].message?.content
			?.split('\n')
			.map((line: string) => line.toLowerCase().trim() === 'yes');

        console.log(result)
		return json({
			response: "You got " + result?.filter(Boolean).length + " correct"
		});
	} catch (error) {
		console.error('Error:', error);
		return json({ error: 'Error processing request' });
	}
}) satisfies RequestHandler;
