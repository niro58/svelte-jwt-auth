import { browser } from '$app/environment';
import type { Cookies } from '@sveltejs/kit';

const cookieData = {
	accessToken: {
		path: '/',
		maxAge: 60 * 60 * 2
	},
	refreshToken: {
		path: '/',
		maxAge: 60 * 60 * 2
	}
};
export function setCookie(name: keyof typeof cookieData, value: string, cookies?: Cookies) {
	console.log('setCookie', name, value);
	if (!cookies && browser) {
		document.cookie = `${name}=${value}; path=${cookieData[name].path}; max-age=${cookieData[name].maxAge}`;
	} else if (cookies) {
		cookies.set(name, value, cookieData[name]);
	}
}
export function removeCookie(name: keyof typeof cookieData, cookies?: Cookies) {
	if (!cookies && browser) {
		console.log('removeCookie', name);
		document.cookie = `${name}=; path=${cookieData[name].path}; max-age=0`;
	} else if (cookies) {
		cookies.delete(name, cookieData[name]);
	}
}
