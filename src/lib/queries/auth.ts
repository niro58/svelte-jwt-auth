import apiClient from '$lib/clients/api';
import type { Result } from '../../utils';

export async function refreshAccessToken(refreshToken: string): Promise<Result<string>> {
	const res = await apiClient.get('/auth/refresh', { params: { refreshToken: refreshToken } });

	const data = res.data;

	if (!data.success) {
		return { success: false, error: 'failed to refresh access token' };
	}

	return {
		success: true,
		data: data.data.accessToken
	};
}

export async function updateAccessTokenCookie(accessToken: string): Promise<Result<boolean>> {
	const response = await apiClient.post('/refresh-token', { accessToken: accessToken });

	if (response.status !== 200) {
		return { success: false, error: 'failed to update access token cookie' };
	}

	return { success: true, data: response.data.accessToken };
}
