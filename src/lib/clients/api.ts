import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { PUBLIC_API_PATH } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import axios, { type InternalAxiosRequestConfig } from 'axios';

const apiClient = axios.create({
	baseURL: PUBLIC_API_PATH
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	return config;
});

apiClient.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		if (error.response?.status === 401) {
			if (browser) {
				goto('/sign-in');
			}else{
				redirect(302, '/sign-in');
			}
		}

		return Promise.reject(error);
	}
);

export default apiClient;
