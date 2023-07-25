import { c as create_ssr_component, e as escape, d as add_attribute, f as each, v as validate_component } from "../../chunks/index2.js";
import "devalue";
import { B as BROWSER } from "../../chunks/prod-ssr.js";
import "@vercel/analytics";
import "chart.js/auto";
const browser = BROWSER;
const Category_svelte_svelte_type_style_lang = "";
const css = {
  code: ".skeleton.svelte-1gbn4tk{animation:svelte-1gbn4tk-skeleton-loading 1s linear infinite alternate;opacity:0.75}.skeleton-text.svelte-1gbn4tk{width:15rem;height:0.7rem;margin:0.25rem;border-radius:0.2rem}@keyframes svelte-1gbn4tk-skeleton-loading{0%{background-color:hsl(200, 20%, 70%)}100%{background-color:hsl(200, 20%, 95%)}}",
  map: null
};
const Category = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { index, category, letter, valid, recordedAnswer, answersSubmitted, loading = false, forRules = false, disabled = false } = $$props;
  let answer = "";
  let cssOutline = "";
  let validResponse = "";
  let rebuttalClicked = false;
  let rebuttalFinished = false;
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.category === void 0 && $$bindings.category && category !== void 0)
    $$bindings.category(category);
  if ($$props.letter === void 0 && $$bindings.letter && letter !== void 0)
    $$bindings.letter(letter);
  if ($$props.valid === void 0 && $$bindings.valid && valid !== void 0)
    $$bindings.valid(valid);
  if ($$props.recordedAnswer === void 0 && $$bindings.recordedAnswer && recordedAnswer !== void 0)
    $$bindings.recordedAnswer(recordedAnswer);
  if ($$props.answersSubmitted === void 0 && $$bindings.answersSubmitted && answersSubmitted !== void 0)
    $$bindings.answersSubmitted(answersSubmitted);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  if ($$props.forRules === void 0 && $$bindings.forRules && forRules !== void 0)
    $$bindings.forRules(forRules);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  $$result.css.add(css);
  {
    if (recordedAnswer === "ZZZZZZ") {
      recordedAnswer = "Unanswered";
    }
  }
  {
    if (!recordedAnswer && answersSubmitted) {
      answer = "";
      loading = true;
    }
  }
  {
    if (answer.toLowerCase().startsWith(letter.toLowerCase()) && answer.length >= 1) {
      cssOutline = "border-green-500/80";
    } else if (answer.length == 0) {
      cssOutline = "border-neutral-800/80";
    } else {
      cssOutline = "border-red-500/80";
    }
  }
  {
    if (valid !== "") {
      if (valid === "yes" && recordedAnswer.toLowerCase().startsWith(letter.toLowerCase())) {
        validResponse = "✔️";
      } else if (valid === "no" || !recordedAnswer.toLowerCase().startsWith(letter.toLowerCase())) {
        validResponse = "❌";
      } else if (valid === "noyes") {
        validResponse = "❌✔️";
      } else if (valid === "nono") {
        validResponse = "❌❌";
      }
    }
  }
  return `<div class="${"flex sm:justify-between items-start mx-6 md:mx-0 md:items-center sm:flex-row flex-col " + escape(loading ? "md:h-9" : "", true)}"><label class="${"p-1 text-xl " + escape(loading ? "skeleton skeleton-text" : "hidden", true) + " svelte-1gbn4tk"}" for="${escape(index, true) + "Input"}"></label>
	<label class="${"p-1 text-xl " + escape(loading ? "hidden" : "", true)}" for="${escape(index, true) + "Input"}">${escape(index)}: ${escape(category)}</label>
	${!recordedAnswer ? `<input ${disabled ? "disabled" : ""} type="text"${add_attribute("placeholder", loading ? "" : `${letter}...`, 0)} class="${"focus:outline-none p-1 rounded-md w-full sm:w-fit " + escape(forRules ? "text-black" : "", true) + " " + escape(loading ? "skeleton" : `${cssOutline} border-2`, true) + " svelte-1gbn4tk"}" name="${escape(index, true) + " : " + escape(category, true)}" id="${escape(index, true) + "Input"}" autocomplete="off" spellcheck="true"${add_attribute("value", answer, 0)}>` : `<div class="flex md:flex-col justify-end md:items-end"><p class="text-xl"><span class="underline">${escape(recordedAnswer)}</span>
				${escape(validResponse)}${escape("")}</p>
			${recordedAnswer.toLowerCase().startsWith(letter.toLowerCase()) && valid !== "yes" && rebuttalFinished === false && rebuttalClicked === false && valid !== "noyes" && valid !== "nono" ? `
				<button class="px-2 py-0.5 bg-neutral-600 hover:bg-neutral-700 rounded-3xl text-white text-sm" type="button">Rebuttal</button>` : ``}</div>`}
</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let letter = "";
  let currentDate = /* @__PURE__ */ new Date();
  currentDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
  let answersSubmitted = false;
  let answerArray = [];
  let responseArray = [];
  let yesCount = 0;
  let noCount = 0;
  let scores = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0
  };
  let date = /* @__PURE__ */ new Date();
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    letter = data.data ? data.data[0].letter : "";
    data.data ? Object.values(data.data[0].categories) : [];
    data.data ? data.data[0].creator : "";
    {
      for (let i = 0; i < responseArray.length; i++) {
        if (responseArray[i].toLowerCase() == "yes" && answerArray[i].toLowerCase().startsWith(letter.toLowerCase())) {
          yesCount++;
        } else {
          noCount++;
        }
      }
    }
    {
      if (yesCount + noCount == 12 && browser === true) {
        localStorage.setItem("yesCount", String(yesCount));
        scores[yesCount] += 1;
        localStorage.setItem("scores", JSON.stringify(scores));
      }
    }
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1um1cj4_START -->${$$result.title = `<title>Groople</title>`, ""}<meta name="description" content="${"Play daily challenge! Answer 12 Categories starting with the letter " + escape(letter, true) + " in 100 seconds. Share your results!"}"><!-- HEAD_svelte-1um1cj4_END -->`, ""}


${`
	<div class="flex justify-center items-center flex-col"><p class="md:text-3xl text-xl">${escape(date.toLocaleDateString())}</p></div>
	<div class="md:mb-[6.5rem]"></div>
	<div class="flex items-center justify-center md:flex-row flex-col w-full relative md:mt-5"><div class="flex flex-col mt-5 items-center relative w-full"><div class="lg:w-1/2 w-full">
				<input type="text"${add_attribute("value", letter, 0)} class="hidden" name="letter">
				${each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], (category, index) => {
      return `<div class="my-1 w-full md:border-b-2">${validate_component(Category, "Category").$$render(
        $$result,
        {
          index: index + 1,
          category: String(category),
          letter,
          valid: responseArray[index] ? responseArray[index].toLowerCase() : "",
          recordedAnswer: answerArray[index],
          answersSubmitted,
          loading: true
        },
        {},
        {}
      )}
						</div>`;
    })}</div>
			<button class="p-2 opacity-90 bg-neutral-800 hover:bg-neutral-900 drop-shadow-md rounded-md text-white md:w-1/2 w-11/12 mb-2 animate-pulse h-9"></button></div></div>`}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
