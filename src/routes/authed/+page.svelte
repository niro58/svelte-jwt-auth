<script lang="ts">
	import { getTokens } from '../../models.svelte';

	const tokens = getTokens();
</script>

<div>
	<div>
		<a href="/logout" class="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
			>Log out</a
		>
	</div>

	<div>Currently logged in as</div>
	{#if tokens}
		<div>Acccess Token : {tokens.accessToken}</div>
		<div>Refresh Token : {tokens.refreshToken}</div>
	{/if}
</div>
