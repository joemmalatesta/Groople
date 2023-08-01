//Get daily challenge details
import { signInWithEmail, supabase } from '$lib/supabaseClient';

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request }) => {
	const { email } = await request.json();
	//If it says so, add one to the play counter.
	if (!validateEmail(email)) return json('Enter valid email');
	console.log(`attempting to add email ${email} to waitlist`);
	const { data: existingData, error } = await supabase
		.from('groupWaitlist')
		.select()
		.eq('email', email);

    //make sure supabase worked right
	if (error) return json('Failed. try again later');
	//if its already in there, mark as duplicate
	if (existingData.length > 0) {
		console.log(`${email} already added to the list`);
		return json('Email already in list');
	}

	//otherwise, add the email to the list!
	const { data, error: err } = await supabase
    .from('groupWaitlist')
    .insert([{email}]);

    //make sure supabase worked right
	if (err) return json('Failed. try again later');

	console.log(`successfully added ${email} to the waitlist!`);
	return json(`success`);
}) satisfies RequestHandler;

function validateEmail(email: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
