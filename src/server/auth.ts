import type { Cookies } from '@sveltejs/kit';
import type { AuthTokens, Result } from '../utils';

export function testServerAuth(user: AuthTokens): Result<boolean> {
	return {
		success: true,
		data: false
	};
}
