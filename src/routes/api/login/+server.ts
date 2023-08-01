//Get daily challenge details
import { signInWithEmail, supabase } from '$lib/supabaseClient';

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request }) => {
	const { email, password } = await request.json();
	//If it says so, add one to the play counter.
    console.log("")
    signInWithEmail(email, password)
	return json('success');
}) satisfies RequestHandler;



async function createAccount() {

}
