import { browser } from '$app/environment';
import { PUBLIC_API_PATH } from '$env/static/public';
import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios';
import { getTokens, setAccessToken, setTokens } from '../models.svelte';
import { refreshAccessToken } from '../queries/auth';
import type { AuthTokens } from '../utils';
import type { Cookies } from '@sveltejs/kit';
import { removeCookie, setCookie } from '../cookies';

const authClient = axios.create({
	baseURL: PUBLIC_API_PATH,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
});

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(callback: (token: string) => void) {
	refreshSubscribers.push(callback);
}

function onRefreshed(token: string) {
	refreshSubscribers.forEach((callback) => callback(token));
	refreshSubscribers = [];
}

authClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	if (browser) {
		throw new Error('This function is only available in the server');
	}

	const { accessToken } = config.tokens;

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
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = false;

			if (!isRefreshing) {
				isRefreshing = true;
				const { refreshToken } = error.config.tokens;
				const newAccessToken = await refreshAccessToken(refreshToken);

				if (newAccessToken.success) {
					setCookie('accessToken', newAccessToken.data, error.config.cookies);
					// Retry all failed requests with the new access token
					onRefreshed(newAccessToken.data);
					isRefreshing = false;
				} else {
					removeCookie('accessToken', error.config.cookies);
					removeCookie('refreshToken', error.config.cookies);
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
