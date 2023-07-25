import { s as supabase } from "../../../chunks/supabaseClient.js";
const actions = {
  default: async (event) => {
    const formData = Object.fromEntries(await event.request.formData());
    const dataArray = Object.entries(formData).map(([index, value]) => ({ index, value }));
    const filteredArray = dataArray.filter((item) => item.value !== "");
    if (!filteredArray) {
      return {
        output: "empty"
      };
    }
    let respondentName = "None provided";
    if (filteredArray.find((element) => element.index == "name")) {
      respondentName = String(filteredArray.shift()?.value);
    }
    if (filteredArray.length === 0) {
      return {
        output: "no categories"
      };
    }
    await supabase.from("createListResponses").insert([{ respondentName, categories: filteredArray.map((item) => item.value) }]).select();
    console.log(`${respondentName} added some new categories ${filteredArray.map((item) => item.value)}`);
    return {
      output: "success"
    };
  }
};
export {
  actions
};
