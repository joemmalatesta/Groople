import { browser } from '$app/environment';

export async function load() {
	if (browser) {
        //local date, hell yeah
        const localDate = new Date().toLocaleDateString('en-US');		
        //Call API to keep everything spooky on the server
		let response = await fetch('/api/getGameDetails', {
			method: 'POST',
			body: JSON.stringify({ date: localDate}),
			headers: {
				'content-type': 'application/json',
				accept: 'application/json'
			}
		});
		let data = await response.json();
		return {
			data
		};
	}
}