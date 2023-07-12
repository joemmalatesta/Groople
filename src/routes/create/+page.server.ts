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
		//get the name from that jawn, assuming it exists, which it will! remove it from the list
		let respondentName = filteredArray.shift();
        if (respondentName?.index != "name"){
            return {
                output: 'no name'
            }
        }
		//now if there's no categories, you doing something wrong
		console.log(filteredArray)
		if (filteredArray.length === 0){
			return {
				output: 'no categories'
			}
		}
		const { data, error } = await supabase
			.from('createListResponses')
			.insert([{ respondentName: respondentName.value , categories: filteredArray.map(item => item.value) }])
			.select();

		console.log(`${respondentName.value} added some new categories ${filteredArray.map(item => item.value)}`)
		return {
			output: 'success'
		};
	}
};
