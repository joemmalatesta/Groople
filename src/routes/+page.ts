import { browser } from '$app/environment';

export async function load() {
	if (browser) {
		// throw new Error('what happening')
        //local date, hell yeah
        const localDate = new Date().toLocaleDateString('en-US');		
        //Call API to keep everything spooky on the server
		const response = await fetch('/api/getGameDetails', {
			method: 'POST',
			body: JSON.stringify({ date: localDate}),
			headers: {
				'content-type': 'application/json',
				accept: 'application/json'
			}
		});
		const data = await response.json();
		return {
			data
		};
	}
}
