import type { HandleServerError } from '@sveltejs/kit';
import { error as errorResponse } from '@sveltejs/kit';

export const handleError: HandleServerError = ({ error, event }) => {
	console.error('An error occurred on the server side:', error, event);
};
