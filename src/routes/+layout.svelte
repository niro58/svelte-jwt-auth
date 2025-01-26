<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import type { LayoutServerData } from './$types';

	let {
		data,
		children
	}: {
		data: LayoutServerData;
		children: Snippet;
	} = $props();
</script>

{@render children()}
