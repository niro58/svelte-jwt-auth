import 'axios';

declare module 'axios' {
	export interface AxiosRequestConfig {
		tokens?: AuthTokens;
		cookies?: Cookies;
	}
}
