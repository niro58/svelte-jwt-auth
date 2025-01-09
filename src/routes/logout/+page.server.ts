import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { cookieSettings } from '../../cookies';

export const load: PageServerLoad = ({ cookies }) => {
	const { accessTokenSettings, refreshTokenSettings } = cookieSettings;

	if (!cookies.get(accessTokenSettings.name) && !cookies.get(refreshTokenSettings.name)) {
		redirect(307, '/sign-in');
	}

	cookies.set(accessTokenSettings.name, '', { path: '/', maxAge: 0 });
	cookies.set(refreshTokenSettings.name, '', { path: '/', maxAge: 0 });
};
