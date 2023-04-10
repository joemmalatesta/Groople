import { OPENAI_KEY } from '$env/static/private';
import { Configuration, OpenAIApi } from 'openai';
const openAI = new OpenAIApi( new Configuration({
      apiKey: OPENAI_KEY
    }))

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

    let output

    openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: prompt
      }]
    }).then(res => {
      output = res.data.choices[0].message?.content
    })
    return {
      message: output,
    };
	}
};
