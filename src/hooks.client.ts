import * as Sentry from '@sentry/sveltekit';
import type { HandleClientError } from '@sveltejs/kit';

Sentry.init({
	dsn: 'https://75d2773c27d883dfaf3775ff83b73913@o4507370066870272.ingest.us.sentry.io/4507370067722240',
	// Tracing for performance brother
	tracesSampleRate: import.meta.env.DEV ? 1 : .3,
	replaysSessionSampleRate: .1,
	replaysOnErrorSampleRate: 1.0,

	integrations: [
		Sentry.replayIntegration({
			// Additional SDK configuration goes in here, for example:
			maskAllText: false,
			blockAllMedia: false
		})
	]
});


const myErrorHandler: HandleClientError = ({ error, event }) => {
	console.error("An error occurred on the client side:", error, event);
  };
  

export const handleError = Sentry.handleErrorWithSentry(myErrorHandler);

// export const handleError: HandleClientError = async ({ error, event }) => {
// 	console.log('in da client');
// 	const errorId = crypto.randomUUID();
// 	// example integration with https://sentry.io/
// 	Sentry.captureException(error, { extra: { event, errorId } });

// 	return {
// 		message: 'Whoops!',
// 		errorId
// 	};
// };
