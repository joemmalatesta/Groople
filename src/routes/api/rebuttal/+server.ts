import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { OPENAI_KEY } from '$env/static/private';
import { Configuration, OpenAIApi } from 'openai';
import type { Actions } from '@sveltejs/kit';
const openAI = new OpenAIApi(
	new Configuration({
		apiKey: OPENAI_KEY
	})
);

export const POST = (async ({ request }) => {
    try {
      const { category, recordedAnswer } = await request.json();
      console.log(category, recordedAnswer);
      let prompt = `You're the judge for the game Scattergories and you've been asked to reassess your answer.
      The player answered ${recordedAnswer} for the category ${category} 
      If you think this is a valid answer, reply with "Yes" and nothing more. Otherwise, reply with "No" and nothing more. There should be no other words in your response besides Yes or No.`;
  
      const res = await openAI.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });
      console.log("chat done")
      
      const response = res.data.choices[0].message?.content;
      if (response === undefined) {
        throw new Error('Failed to retrieve valid response from the AI model.');
      }
  
      console.log(response);
      return json(response.toLowerCase());
    } catch (error) {
      console.error(error);
      return new Response('An error occurred while processing the request.', { status: 500 });
    }
  }) satisfies RequestHandler;