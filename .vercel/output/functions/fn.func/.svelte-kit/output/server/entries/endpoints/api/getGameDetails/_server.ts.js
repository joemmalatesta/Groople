import { s as supabase } from "../../../../chunks/supabaseClient.js";
import { j as json } from "../../../../chunks/index.js";
const POST = async ({ request }) => {
  const { date } = await request.json();
  let { data, error } = await supabase.from("dailyChallenge").select().eq("date", date);
  if (!data) {
    console.log(`data not retrieved for ${date}.. using backup shit
Error Message: ${error?.message}
Error Code: ${error?.code}
Error Details: ${error?.details}
 Error Hint: ${error?.hint}`);
    data = [
      {
        letter: "E",
        categories: [
          "Nicknames",
          "Words Associated With Money",
          "Board Games",
          "Things You Plug In",
          "Cosmetics/Toiletries",
          "Presidents",
          "Authors",
          "Types of Drink",
          "Famous Duos and Trios",
          "Things That Have Stripes",
          "College Majors",
          "World Leaders/Politicians"
        ]
      }
    ];
    return json(data);
  }
  console.log(`game data successfully retrieved for ${date}`);
  return json(data);
};
export {
  POST
};
