import { s as supabase } from "../../../../chunks/supabaseClient.js";
import { j as json } from "../../../../chunks/index.js";
const POST = async ({ request }) => {
  const { date, score, previousScore } = await request.json();
  let response = await updateScores(date, score, previousScore);
  return json(response);
};
const GET = async ({ request, url }) => {
  let date = url.searchParams.get("date");
  return json(await getScores(date));
};
async function updateScores(date, score, previousScore) {
  if (score > 12 || score < 0) {
    console.log("invalid score submitted");
    return json("invalid score");
  }
  console.log(`Scores being changed for ${date}. Adding to ${score} and removing from ${previousScore ? previousScore : "nothing"}`);
  const { data: existingData, error } = await supabase.from("dailyChallenge").select("scores").eq("date", date);
  if (error) {
    console.log(`Was not able to retrieve scores for ${date}
Error: ${error}`);
    return json("failure");
  } else {
    const existingScores = existingData[0]?.scores;
    existingScores[score] += 1;
    if (previousScore) {
      existingScores[previousScore] -= 1;
    }
    const { data: updatedData, error: updateError } = await supabase.from("dailyChallenge").update({ scores: existingScores }).eq("date", date);
    if (updateError) {
      console.log(`Was not able to update scores for ${date}
Error: ${updateError}`);
      return json("failure");
    } else {
      console.log(`Scores for ${date} updated.`);
      return json("success");
    }
  }
}
async function getScores(date) {
  const { data, error } = await supabase.from("dailyChallenge").select("scores").eq("date", date);
  if (error) {
    console.log(`Was not able to retrieve scores for ${date}
Error: ${error.message}`);
    return json("failure");
  } else {
    console.log(`retrieved scores for ${date}`);
    return data[0]?.scores;
  }
}
export {
  GET,
  POST
};
