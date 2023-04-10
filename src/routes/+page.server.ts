import { OPENAI_KEY } from '$env/static/private';
const API_URL = 'https://api.openai.com/v1/engines/davinci/completions';

export const actions = {
	default: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());
		const dataArray = Object.entries(formData).map(([index, value]) => ({ index, value }));

		// Sort the array of objects by index in ascending order
		dataArray.sort((a, b) => Number(a.index) - Number(b.index));

		// Remove the letter object from the array and get its value
		const letterIndex = dataArray.findIndex(({ index }) => index === 'letter');
		const [letterObject] = dataArray.splice(letterIndex, 1);
		const letter = letterObject?.value; // Use optional chaining in case letterObject is undefined

		// Display the formatted data in the console
		let useableData = dataArray.map(({ index, value }) => `${index}: ${value}`).join('\n');
		let prompt = `Welcome to Scattergories! You are the judge, and your task is to determine whether the player's responses match the category and start with the selected letter. 
    If the response is a valid match, please respond with a "Yes." If the response does not match, please respond with a "No."
     Please ensure that responses are not overly-vague or manipulated by unjust use of adjectives.
    
    Here are the 12 categories and answers for a player with the letter "${letter}":
    ${useableData}
    `;

    console.log(prompt)

		const body = JSON.stringify({
          prompt,
          max_tokens: 50,
          n: 1,
          stop: 'finished',
          temperature: 0.2,
        });
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_KEY}`,
        };
        try {
          const response = await fetch(API_URL, { method: 'POST', body, headers });
          const json = await response.json();
          console.log('OpenAI response:', json);
          const message = json.choices[0].text.trim();
          console.log(message)
          return {
            message : "working",
          };
        } catch (error) {
          console.error(error);
          return {
            message: error,
          };
        }
	}
};
