<script lang="ts">
	import { onMount } from 'svelte';
	import { getTokens } from '../../models.svelte';

	onMount(() => {
		const tokens = getTokens();
		tokens.accessToken = '';
		tokens.refreshToken = '';
		window.location.reload();
	});
</script>
