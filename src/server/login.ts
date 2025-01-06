import type { AuthTokens, Result } from '../utils';

export async function login(username: string, password: string): Promise<Result<AuthTokens>> {
	if (username != 'test' && password != 'test') {
		return {
			success: false,
			error: 'invalid credentials'
		};
	}

	return {
		success: true,
		data: {
			accessToken: 'sad',
			refreshToken: 'mad'
		}
	};
}
