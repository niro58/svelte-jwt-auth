import { fail, redirect } from '@sveltejs/kit';
import { login } from '../server/login';
import type { Actions, PageServerLoad } from './$types';
import { setCookie } from '../cookies';
export const load: PageServerLoad = async ({ locals }) => {
	if (locals.tokens) {
		redirect(307, '/authed');
	}
};

export const actions = {
	default: async ({ cookies, request }) => {
		const formData = await request.formData();
		const loginRes = await login(
			formData.get('username')?.toString() || '',
			formData.get('password')?.toString() || ''
		);
		if (!loginRes.success) {
			return fail(400);
		}

		setCookie('accessToken', loginRes.data.accessToken, cookies);
		setCookie('refreshToken', loginRes.data.refreshToken, cookies);
	}
} satisfies Actions;
