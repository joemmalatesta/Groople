import * as Sentry from '@sentry/node';
import crypto from 'crypto';
import type { HandleServerError } from '@sveltejs/kit';

Sentry.init({
	dsn: 'https://75d2773c27d883dfaf3775ff83b73913@o4507370066870272.ingest.us.sentry.io/4507370067722240'
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
