import { OPENAI_KEY } from '$env/static/private';
const API_URL = 'https://api.openai.com/v1/engines/davinci/completions';


export async function load() {
  const prompt = 'This is a test prompt for GPT 3. Please respond with yes and nothing more if this is working...';
  const body = JSON.stringify({
    prompt,
    max_tokens: 1024,
    n: 1,
    stop: '\n',
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

    return {
      message,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'Meow meow',
    };
  }
}