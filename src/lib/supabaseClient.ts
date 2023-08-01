import { createClient } from '@supabase/supabase-js';
import { SUPABASE_SECRET, SUPABASE_URL, SUPABASE_CLIENT_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET);

export async function loginWithGoogle() {
	console.log('this running?');
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google'
	});
	console.log(data.url);
	supabase.auth.onAuthStateChange((event, session) => {
		console.log(event, session);
	});
	throw redirect(303, String(data.url));
}

async function signInWithEmail() {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: 'example@email.com',
		password: 'example-password'
	});
}

async function signOut() {
	const { error } = await supabase.auth.signOut();
}
