import { browser } from '$app/environment';
import { PUBLIC_API_PATH } from '$env/static/public';
import axios, { type InternalAxiosRequestConfig } from 'axios';
import { getTokens } from '../models.svelte';
import { refreshAccessToken } from '../queries/auth';

const authClient = axios.create({
	baseURL: PUBLIC_API_PATH,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
});

let isRefreshing = false;
//token is being put into header of the repeated request
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(callback: (token: string) => void) {
	refreshSubscribers.push(callback);
}

function onRefreshed(token: string) {
	refreshSubscribers.forEach((callback) => callback(token));
	refreshSubscribers = [];
}

authClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	if (!browser) {
		throw new Error('This function is only available in the browser');
	}

	const { accessToken } = getTokens();

	if (config.headers && accessToken) {
		config.headers['Authorization'] = `Bearer ${accessToken}`;
	}

	return config;
});

authClient.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		if (!browser) {
			throw new Error('This function is only available in the browser');
		}

		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = false;

			if (!isRefreshing) {
				isRefreshing = true;
				const tokens = getTokens();
				const newAccessToken = await refreshAccessToken(tokens.refreshToken);

				if (newAccessToken.success) {
					// Save new access token
					tokens.accessToken = newAccessToken.data;
					// Retry all failed requests with the new access token
					onRefreshed(newAccessToken.data);
					isRefreshing = false;
				} else {
					isRefreshing = false;
					return Promise.reject(error);
				}
			}

			return new Promise((resolve) => {
				subscribeTokenRefresh((token: string) => {
					originalRequest.headers['Authorization'] = `Bearer ${token}`;
					resolve(axios(originalRequest));
				});
			});
		}

		// For other errors, just reject the promise
		return Promise.reject(error);
	}
);

export default authClient;
