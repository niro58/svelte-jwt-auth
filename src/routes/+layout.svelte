<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import type { LayoutServerData } from './$types';
	import { getTokens, setTokens } from '../models.svelte';
	let {
		data,
		children
	}: {
		data: LayoutServerData;
		children: Snippet;
	} = $props();

	setTokens();
	$effect(() => {
		if (data.tokens) {
			const tokens = getTokens();
			tokens.accessToken = data.tokens.accessToken;
			tokens.refreshToken = data.tokens.refreshToken;
		}
	});
</script>

{@render children()}
