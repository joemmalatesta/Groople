import * as Sentry from '@sentry/svelte';
import type { HandleClientError } from '@sveltejs/kit';

Sentry.init({
  dsn: "https://146ecd29f6f4c6f133e673a12919076b@o4506356838957056.ingest.sentry.io/4506359470948352",

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 1.0,

  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    new Sentry.Replay({
      // Additional SDK configuration goes in here, for example:
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
});


export const handleError: HandleClientError = async ({ error, event }) => {
    console.log("in da client")
	const errorId = crypto.randomUUID();
	// example integration with https://sentry.io/
	Sentry.captureException(error, { extra: { event, errorId } });

	return {
		message: 'Whoops!',
		errorId
	};
};
