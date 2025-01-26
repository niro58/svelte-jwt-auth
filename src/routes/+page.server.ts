import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.isAuthenticated) {
		redirect(307, '/authed');
	} else {
		redirect(307, '/sign-in');
	}
};
