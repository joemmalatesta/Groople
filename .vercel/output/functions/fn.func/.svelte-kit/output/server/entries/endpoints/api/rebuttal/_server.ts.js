import { j as json } from "../../../../chunks/index.js";
import { O as OPENAI_KEY } from "../../../../chunks/private.js";
import { OpenAIApi, Configuration } from "openai";
const openAI = new OpenAIApi(
  new Configuration({
    apiKey: OPENAI_KEY
  })
);
const POST = async ({ request }) => {
  try {
    const { category, recordedAnswer } = await request.json();
    if (recordedAnswer.length > 45) {
      console.log("someone's trying to fuck around...");
      return new Response("You really shouldn't be doing that.", { status: 500 });
    }
    let prompt = `Does the response "${recordedAnswer}" fit in the category "${category}"? There should be no other words in your response besides Yes or No, no explanation should be provided`;
    const res = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });
    let response = res.data.choices[0].message?.content.replace(/\./g, "");
    console.log(`Rebuttal: ${prompt}
Response: ${response}`);
    if (response?.toLowerCase() != "yes" && response?.toLowerCase() != "no") {
      console.log("shit response... Rebuttal broke");
      response = "no";
    }
    if (response === void 0) {
      throw new Error("Failed to retrieve valid response from the AI model.");
    }
    return json(response.toLowerCase());
  } catch (error) {
    console.error(error);
    return new Response("An error occurred while processing the request.", { status: 500 });
  }
};
export {
  POST
};
