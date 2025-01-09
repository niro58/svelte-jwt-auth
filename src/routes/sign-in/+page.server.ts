import { fail, redirect } from '@sveltejs/kit';
import { login } from '../../server/login';
import type { Actions, PageServerLoad } from './$types';
import { cookieSettings } from '../../cookies';
export const load: PageServerLoad = async ({ locals }) => {
	if (locals.tokens) {
		redirect(307, '/authed');
	}
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const { accessTokenSettings, refreshTokenSettings } = cookieSettings;

		const formData = await request.formData();
		const loginRes = await login(
			formData.get('username')?.toString() || '',
			formData.get('password')?.toString() || ''
		);
		if (!loginRes.success) {
			return fail(400);
		}

		cookies.set(accessTokenSettings.name, loginRes.data.accessToken, accessTokenSettings.opts);
		cookies.set(refreshTokenSettings.name, loginRes.data.refreshToken, refreshTokenSettings.opts);
	}
} satisfies Actions;
