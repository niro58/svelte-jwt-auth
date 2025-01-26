type Success<T> = {
	success: true;
	data: T;
};
type Failure<> = {
	success: false;
	error: string;
};

export type Result<T> = Success<T> | Failure;
