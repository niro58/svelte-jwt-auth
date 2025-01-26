import { PUBLIC_NODE_ENV } from '$env/static/public';

export const cookieSettings: {
	[key: string]: {
		name: string;
		opts: {
			path: string;
			secure?: boolean | undefined;
			sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined;
			maxAge: number;
		};
	};
} = {
	accessTokenSettings: {
		name: 'accessToken',
		opts: {
			path: '/',
			maxAge: 30
		}
	},
	refreshTokenSettings: {
		name: 'refreshToken',
		opts: {
			path: '/',
			secure: PUBLIC_NODE_ENV === 'production',
			maxAge: 60 * 60 * 2
		}
	}
};
