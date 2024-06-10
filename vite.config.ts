import { sentrySvelteKit } from "@sentry/sveltekit";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
const env = loadEnv(process.env.NODE_ENV!, process.cwd(), "")

export default defineConfig({
	plugins: [sentrySvelteKit({
        sourceMapsUploadOptions: {
            org: "sentry-devrel",
            project: "groople",
            authToken: env.SENTRY_AUTH_TOKEN
        }
    }), sveltekit()]
});