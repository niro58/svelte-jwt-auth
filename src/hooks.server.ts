import type { Handle } from '@sveltejs/kit';
import { refreshAccessToken } from './queries/auth';
import { setCookie } from './cookies';

export const handle: Handle = async ({ event, resolve }) => {
	const accessToken = event.cookies.get('accessToken');
	const refreshToken = event.cookies.get('refreshToken');
	if (accessToken && refreshToken) {
		event.locals.tokens = {
			accessToken,
			refreshToken
		};
	} else if (!accessToken && refreshToken) {
		const accessTokenRes = await refreshAccessToken(refreshToken);
		if (accessTokenRes.success) {
			setCookie('accessToken', accessTokenRes.data, event.cookies);
			event.locals.tokens = {
				refreshToken,
				accessToken: accessTokenRes.data
			};
		}
	}

	const response = await resolve(event);

	return response;
};
