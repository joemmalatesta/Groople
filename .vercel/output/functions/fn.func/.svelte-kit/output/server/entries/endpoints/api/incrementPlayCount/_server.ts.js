import { s as supabase } from "../../../../chunks/supabaseClient.js";
import { j as json } from "../../../../chunks/index.js";
const POST = async ({ request }) => {
  const { date } = await request.json();
  await incrementPlayCount(date);
  return json("success");
};
async function incrementPlayCount(date) {
  const { data: existingData, error } = await supabase.from("dailyChallenge").select("plays").eq("date", date);
  if (error) {
    console.log(`Was not able to retrieve score for ${date}
Error: ${error}`);
  } else {
    const existingPlays = existingData[0]?.plays;
    const newPlays = existingPlays + 1;
    const { data: updatedData, error: updateError } = await supabase.from("dailyChallenge").update({ plays: newPlays }).eq("date", date);
    if (updateError) {
      console.log(`Was not able to update score for ${date}
Error: ${updateError}`);
    } else {
      console.log(`Score for ${date} incremented.`);
    }
  }
}
export {
  POST
};
