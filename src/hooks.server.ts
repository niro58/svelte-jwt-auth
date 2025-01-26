import { type Handle } from '@sveltejs/kit';
import { refreshAccessToken } from './lib/queries/auth';
import { cookieSettings } from './cookies';
import { deleteTokenCookies } from '$lib/server/auth';
import { PUBLIC_API_PATH } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
	const { accessTokenSettings, refreshTokenSettings } = cookieSettings;

	let accessToken = event.cookies.get(accessTokenSettings.name);
	const refreshToken = event.cookies.get(refreshTokenSettings.name);

	if (!refreshToken) {
		deleteTokenCookies(event);
		return resolve(event);
	}

	if (!accessToken) {
		const accessTokenRes = await refreshAccessToken(refreshToken);

		if (!accessTokenRes.success) {
			deleteTokenCookies(event);
			return resolve(event);
		}

		event.cookies.set(accessTokenSettings.name, accessTokenRes.data, accessTokenSettings.opts);

		accessToken = accessTokenRes.data;
	}
	event.locals.isAuthenticated = true;

	if (event.url.href.startsWith(PUBLIC_API_PATH)) {
		event.request.headers.set('Authorization', `Bearer ${accessToken}`);
	}
	console.log(accessToken);

	return await resolve(event);
};
