import { c as create_ssr_component } from "../../chunks/index2.js";
import { inject } from "@vercel/analytics";
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  inject({ mode: "production" });
  return `<header class="flex justify-center items-center flex-col relative"><h1><a href="/" class="md:text-7xl text-5xl font-semibold text-transparent bg-black bg-clip-text p-3 flex items-center"><img src="favicon.svg" alt="Groople Logo" class="md:w-28 w-20 mr-1 mt-2">
			roople
		</a></h1></header>
${slots.default ? slots.default({}) : ``}
<footer class="flex justify-center mb-3"><h4 class="text-sm font-sans">Created by <a href="https://joemmalatesta.com" class="underline underline-offset-2 hover:underline-offset-4 transition-all font-sans">Joe Malatesta</a></h4></footer>`;
});
export {
  Layout as default
};
