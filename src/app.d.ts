// See https://svelte.dev/docs/kit/types#app.d.ts

import type { AuthTokens } from './utils';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			isAuthenticated: boolean;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
