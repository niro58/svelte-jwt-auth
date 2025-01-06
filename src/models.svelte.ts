import { getContext, setContext } from 'svelte';
import { removeCookie } from './cookies';
import { goto } from '$app/navigation';

const TOKEN_KEY = Symbol('TOKENS');
class Tokens {
	accessToken: string = $state('');
	refreshToken: string = $state('');

	constructor(accessToken: string, refreshToken: string) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}
	logout() {
		removeCookie('accessToken');
		removeCookie('refreshToken');
	}
}
export function getTokens() {
	return getContext<ReturnType<typeof setTokens>>(TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken: string) {
	return setContext(TOKEN_KEY, new Tokens(accessToken, refreshToken));
}
