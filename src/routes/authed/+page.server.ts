import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { testAuth } from '$lib/queries/test';
import { cookieSettings } from '../../cookies';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.isAuthenticated) {
		redirect(307, '/');
	}
};

export const actions: Actions = {
	testAuth: async ({ cookies }) => {
		const res = await testAuth(cookies.get(cookieSettings.accessTokenSettings.name));

		// if (!res.success) {
		// 	return redirect(302, '/sign-in');
		// }

		return {
			status: 200,
			body: { message: 'You are authenticated' }
		};
	},
	removeAccessToken: async ({ cookies, request }) => {
		cookies.delete('accessToken', {
			path: '/'
		});
		return {
			status: 200,
			body: { message: 'Successfully removed accessToken' }
		};
	},
	removeRefreshToken: async ({ cookies, request }) => {
		cookies.delete('refreshToken', {
			path: '/'
		});
		return {
			status: 200,
			body: { message: 'Successfully removed refreshToken' }
		};
	}
} satisfies Actions;
