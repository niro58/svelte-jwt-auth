import type { Result } from '../../utils';
import { randomString } from '$lib/utils';
import type { RequestEvent } from '@sveltejs/kit';
import { cookieSettings } from '../../cookies';

export async function login(
	username: string,
	password: string
): Promise<
	Result<{
		accessToken: string;
		refreshToken: string;
	}>
> {
	if (username != 'test' && password != 'test') {
		return {
			success: false,
			error: 'invalid credentials'
		};
	}

	return {
		success: true,
		data: {
			accessToken: randomString(32),
			refreshToken: randomString(32)
		}
	};
}

export function deleteTokenCookies(event: RequestEvent) {
	event.cookies.delete(cookieSettings.accessTokenSettings.name, {
		path: cookieSettings.accessTokenSettings.opts.path
	});
	event.cookies.delete(cookieSettings.refreshTokenSettings.name, {
		path: cookieSettings.refreshTokenSettings.opts.path
	});
}
