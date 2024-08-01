import type { Actions } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const actions: Actions = {
	default: async (event) => {
		let response: string;
		const formData = Object.fromEntries(await event.request.formData());
		const dataArray = Object.entries(formData).map(([index, value]) => ({ index, value }));
		const filteredArray = dataArray.filter((item) => item.value !== '');
		//Is there anything? if not it don't matter
		if (!filteredArray) {
			return {
				output: 'empty'
			};
		}
		let respondentName = "None provided"
		if (filteredArray.find(element => element.index == "name")){
			respondentName = String(filteredArray.shift()?.value);
		}
		//get the name from that jawn, assuming it exists, which it will! remove it from the list
		//now if there's no categories, you doing something wrong
		if (filteredArray.length === 0){
			return {
				output: 'no categories'
			}
		}
		const { data, error } = await supabase
			.from('createListResponses')
			.insert([{ respondentName: respondentName , categories: filteredArray.map(item => item.value) }])
			.select();

		console.log(`${respondentName} added some new categories ${filteredArray.map(item => item.value)}`)
		return {
			output: 'success'
		};
	}
};
