import { c as create_ssr_component, f as each, e as escape, d as add_attribute } from "../../../chunks/index2.js";
import "devalue";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let categories = ["", "", "", "", "", "", "", "", "", "", "", ""];
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `${$$result.head += `<!-- HEAD_svelte-10s95wa_START -->${$$result.title = `<title>Create New List</title>`, ""}<!-- HEAD_svelte-10s95wa_END -->`, ""}

<div class="md:mt-10 mt-2 flex flex-col lg:mx-64 xl:mx-80 mx-5"><h1 class="text-4xl">Create A List</h1>
	${form?.output == "no categories" ? `<p class="text-red-500 text-sm">Must submit at least 1 category</p>` : ``}
	<form class="flex flex-col w-full" method="POST"><div class="flex flex-col w-fit md:gap-2 my-2"><input type="text" name="name" placeholder="Your name here" class="mt-2 border-2 p-1 rounded-md">

			<p class="text-sm">For a shoutout if your list is used</p></div>
		${each(categories, (category, index) => {
    return `<div class="gap-2 flex items-center border-b-2 text-xl m-1 w-full"><label for="${"submission " + escape(index + 1, true)}">${escape(index + 1)}.</label>
				<input name="${"submission " + escape(index + 1, true)}" type="text" class="w-full p-2" placeholder="New Category"${add_attribute("value", categories[index], 0)}>
			</div>`;
  })}
		<button class="px-3 py-1 mb-2 bg-neutral-800 hover:bg-neutral-900 text-2xl border-2 rounded-md w-full text-white">${escape(form?.output == "success" ? "Submitted!" : "Submit List")}</button></form></div>`;
});
export {
  Page as default
};
