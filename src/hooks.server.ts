import * as Sentry from '@sentry/node';
import crypto from 'crypto';
import type { HandleServerError } from '@sveltejs/kit';

Sentry.init({
	dsn: 'https://c3678b3ae77f6e9b815d3abe29e50f37@o4506356838957056.ingest.sentry.io/4506359185670144'
});

export const handleError: HandleServerError = async ({ error, event }) => {
    console.log('On the server')
	const errorId = crypto.randomUUID();
	// example integration with https://sentry.io/
	Sentry.captureException(error, { extra: { event, errorId } });

	return {
		message: 'Whoops!',
		errorId
	};
};
