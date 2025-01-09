import { getContext, setContext } from 'svelte';

const TOKEN_KEY = Symbol('TOKENS');
class Tokens {
	accessToken: string = $state('');
	refreshToken: string = $state('');

	isAuthenticated() {
		return this.accessToken !== '' && this.refreshToken !== '';
	}
}
export function getTokens() {
	return getContext<ReturnType<typeof setTokens>>(TOKEN_KEY);
}

export function setTokens() {
	return setContext(TOKEN_KEY, new Tokens());
}
