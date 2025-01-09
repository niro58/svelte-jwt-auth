export const cookieSettings: {
	[key: string]: {
		name: string;
		opts: {
			path: string;
			maxAge: number;
		};
	};
} = {
	accessTokenSettings: {
		name: 'accessToken',
		opts: {
			path: '/',
			maxAge: 60 * 30
		}
	},
	refreshTokenSettings: {
		name: 'refreshToken',
		opts: {
			path: '/',
			maxAge: 60 * 60 * 2
		}
	}
};
