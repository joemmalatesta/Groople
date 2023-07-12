import { browser } from "$app/environment";


export async function load() {
    if (browser){
        //local date, hell yeah
        const currentDate = new Date().toISOString().split('T')[0];

        //Call API to keep everything spooky on the server
        let response = await fetch('/api/getGameDetails', {
			method: 'POST',
			body: JSON.stringify({ date: currentDate }),
			headers: {
				'content-type': 'application/json',
				accept: 'application/json'
			}
		});
        let data = await response.json()
        return{
            data
        }
    }
}