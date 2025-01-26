import { randomString } from '$lib/utils';
import { json } from '@sveltejs/kit';

export async function GET({ request }) {
	const url = request.url.split('?');
	const query = url[1].split('=');
	const refreshToken = query[1];

	if (!refreshToken) {
		return json(
			{
				error: 'refreshToken token is required'
			},
			{
				status: 400
			}
		);
	}
	return json({
		success: true,
		data: {
			accessToken: randomString(32)
		}
	});
}
