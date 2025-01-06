<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import type { LayoutServerData } from './$types';
	import { setTokens } from '../models.svelte';
	let {
		data,
		children
	}: {
		data: LayoutServerData;
		children: Snippet;
	} = $props();

	$effect(() => {
		if (data.tokens) {
			console.log('set the token');
			setTokens(data.tokens.accessToken, data.tokens.refreshToken);
		}
	});
</script>

{@render children()}
