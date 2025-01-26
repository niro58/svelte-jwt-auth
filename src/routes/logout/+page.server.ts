import { deleteTokenCookies } from '$lib/server/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.isAuthenticated) {
			return fail(401);
		}
		deleteTokenCookies(event);

		return redirect(302, '/sign-in');
	}
};
