import * as Sentry from '@sentry/sveltekit';
import type { HandleServerError } from '@sveltejs/kit';
import { error as errorResponse, redirect } from '@sveltejs/kit';


Sentry.init({
	dsn: 'https://75d2773c27d883dfaf3775ff83b73913@o4506044970565632.ingest.us.sentry.io/4507370067722240',
	tracesSampleRate: import.meta.env.DEV ? 1: .3,
});

const myErrorHandler: HandleServerError = ({ error, event }) => {
	console.error("An error occurred on the server side:", error, event);
  };
  
  export const handleError = Sentry.handleErrorWithSentry(myErrorHandler);


  export const handle = Sentry.sentryHandle();
// Or use `sequence`:
// export const handle = sequence(Sentry.sentryHandle(), yourHandler());


// export const handleError: HandleServerError = async ({ error, event }) => {
//     console.log('On the server')
// 	const errorId = crypto.randomUUID();
// 	// example integration with https://sentry.io/
// 	Sentry.captureException(error, { extra: { event, errorId } });

// 	if (error instanceof Error){
// 		errorResponse(500, {
// 		message: error.message,
// 	});
// 	}
	
// };
