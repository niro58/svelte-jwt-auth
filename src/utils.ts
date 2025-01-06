type Success<T> = {
	success: true;
	data: T;
};
type Failure<> = {
	success: false;
	error: string;
};

export type Result<T> = Success<T> | Failure;

export type AuthTokens = {
	accessToken: string;
	refreshToken: string;
};


export type GetRequest = {
	method: 'GET';
	
}