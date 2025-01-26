import { json } from '@sveltejs/kit';

export async function GET({ request }) {
	const auth = request.headers.get('Authorization');

	if (!auth || auth.length < 32) {
		return json(
			{
				error: 'access token is required'
			},
			{
				status: 401
			}
		);
	}

	return json({ success: true });
}
