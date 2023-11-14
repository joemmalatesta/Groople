import { OPENAI_KEY } from '$env/static/private';
import { Configuration, OpenAIApi } from 'openai';
import type { Actions } from '@sveltejs/kit';
const openAI = new OpenAIApi(
	new Configuration({
		apiKey: OPENAI_KEY
	})
);

let letter: string

export const actions: Actions = {
	default: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());
		const dataArray = Object.entries(formData).map(([index, value]) => ({ index, value }));
		let category = dataArray[0].index;
		let answer = dataArray[0].value;
		letter = String(dataArray[1].value) || letter
		try {
			if (!answer || answer.length > 45 || String(answer)[0].toLowerCase() != String(letter).toLowerCase()) {
				console.log(`Blitz incorrect criteria for judging \n Letter: ${letter} \n answer: ${answer}`)
				return {
					output: "no"
				};
			}
			let prompt = `In Scattergories, does the response "${capitalizeFirstLetter(answer)}" fit in the category "${category}"? There should be no other words in your response besides Yes or No, no explanation should be provided`;
			const res = await openAI.createChatCompletion({
				model: 'gpt-4-1106-preview',
				messages: [
					{
						role: 'user',
						content: prompt
					}
				]
			});

			let response = res.data.choices[0].message?.content.replace(/\./g, '');
			console.log(`Rebuttal: ${prompt}\nResponse: ${response}`);
			//Default to no if it gives some stupid shit
			if (response?.toLowerCase() != 'yes' && response?.toLowerCase() != 'no') {
				console.log('shit response... Rebuttal broke');
				response = 'no';
			}
			if (response === undefined) {
				throw new Error('Failed to retrieve valid response from the AI model.');
			}

			return {
				output: response.toLowerCase()
			};
		} catch (error) {
			console.error(error);
			return new Response('An error occurred while processing the request.', { status: 500 });
		}
	}
};


function capitalizeFirstLetter(answer: any) {
	return answer.charAt(0).toUpperCase() + answer.slice(1);
}
