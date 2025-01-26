import apiClient from '$lib/clients/api';
import type { Result } from '../../utils';

export async function testAuth(accessToken?: string): Promise<Result<string>> {
	const res = await apiClient.get('/test-auth', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	if (res.status !== 200) {
		return {
			success: false,
			error: 'failed to test auth'
		};
	}
	return {
		success: true,
		data: 'auth test success'
	};
}
