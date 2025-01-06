import type { Result } from '../utils';

export function refreshAccessToken(refreshToken: string): Result<string> {
	return {
		success: true,
		data: 'lol'
	};
}
