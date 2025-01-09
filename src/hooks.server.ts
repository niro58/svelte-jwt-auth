import type { Handle } from '@sveltejs/kit';
import { refreshAccessToken } from './queries/auth';
import { cookieSettings } from './cookies';

export const handle: Handle = async ({ event, resolve }) => {
	const { accessTokenSettings, refreshTokenSettings } = cookieSettings;

	const accessToken = event.cookies.get(accessTokenSettings.name);
	const refreshToken = event.cookies.get(refreshTokenSettings.name);
	if (accessToken && refreshToken) {
		event.locals.tokens = {
			accessToken,
			refreshToken
		};
	} else if (!accessToken && refreshToken) {
		const accessTokenRes = await refreshAccessToken(refreshToken);
		if (accessTokenRes.success) {
			event.cookies.set(accessTokenSettings.name, accessTokenRes.data, accessTokenSettings.opts);

			event.locals.tokens = {
				refreshToken,
				accessToken: accessTokenRes.data
			};
		}
	}

	const response = await resolve(event);

	return response;
};
