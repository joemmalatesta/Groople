import { OPENAI_KEY } from '$env/static/private';
import { Configuration, OpenAIApi } from 'openai';
import  type{ Actions } from '@sveltejs/kit';
const openAI = new OpenAIApi(
	new Configuration({
		apiKey: OPENAI_KEY
	})
);

export const actions: Actions = {
	default: async (event) => {
		// throw new Error('cool')c
		const formData = Object.fromEntries(await event.request.formData());
		const dataArray = Object.entries(formData).map(([index, value]) => ({ index, value }));

		// Sort the array of objects by index in ascending order
		dataArray.sort((a, b) => Number(a.index) - Number(b.index));
		// Remove the letter object from the array and get its value
		const letterIndex = dataArray.findIndex(({ index }) => index === 'letter');
		const [letterObject] = dataArray.splice(letterIndex, 1);
		const letter = letterObject?.value; // Use optional chaining in case letterObject is undefined

		// Display the formatted data in the console
		//Auto reject values starting with wrong letter, over 45 characters and under 1 character, and capitalize first letter for answers going well
		const useableData = dataArray
			.map(
				({ index, value }) =>
					`${index}: ${
						value && String(value).length < 45 && String(value).trim().length > 1
							? capitalizeFirstLetter(value)
							: 'ZZZZZZ'
					}`
			)
			.join('\n');
		const prompt = `Welcome to Scattergories! You are the judge, and your task is to determine whether the player's responses match the category and start with the selected letter.
		If the response is a valid match, please respond with a "Yes." If the response does not match or is a combination of just the letter and another word, please respond with a "No." 
		The response should not be vague and should not unjustly use descriptive words to cheat the system. You should also respond "No" to answers that seem made up or random - They should be somewhat well known and something a group of players would agree on.

		Here are the 12 categories and answers for a player with the letter "${letter}":
		${useableData}
		
		The input is given as "Number : Category: Answer".
		
		Your response should follow this guideline:
		
		Yes/No
		Yes/No
		Yes/No
		Yes/No
		Yes/No
		Yes/No
		Yes/No
		Yes/No
		Yes/No
		Yes/No
		Yes/No
		Yes/No
		
		There should be no other words than yes or no. No explanation, no filling in the blanks, nothing more than 12 simple Yes or No's.
		`;

		try {
			const res = await openAI.createChatCompletion({
				model: 'gpt-3.5-turbo-0125',
				messages: [
					{
						role: 'user',
						content: prompt
					}
				]
			});

			const answerArray = res.data.choices[0].message?.content;

			// console.log('Prompt:' + prompt);
			// console.log('Answers:\n' + answerArray);
			console.log(answerArray!.trim().split('\n').length)
			//if the array is of the wrong size PLEASE MAKE ME IT KNOWN
			if (answerArray!.trim().split('\n').length != 12) {
				console.log('SOMETHING BAD HAPPENING! ANSWER ARRAY IS BAD:\n' + answerArray);
			}


			console.log(answerArray)
			return {
				// Useable Data should be dataArray it makes more sense but whatever
				input: useableData,
				output: answerArray
			};
		} catch (error: any) {
			if (error.response && error.response.status === 500) {
				return {
					input: useableData,
					output: '500 error'
				};
			}
			console.error('An error occurred making openAI call:', `${error.response.status} -- ${error.message}`);
		}
	}
};

function capitalizeFirstLetter(answer: any) {
	return answer.charAt(0).toUpperCase() + answer.slice(1);
}
