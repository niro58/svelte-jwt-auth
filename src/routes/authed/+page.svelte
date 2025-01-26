<script lang="ts">
	import { enhance } from '$app/forms';
	import { testAuth } from '../../lib/queries/test';

	let queryResult = $state('');
</script>

<div>
	<div class="flex flex-row gap-5 pb-5">
		<form method="POST" action="/logout">
			<button class="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
				Log out
			</button>
		</form>
		<button
			class="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
			onclick={() => {
				testAuth().then((res) => {
					queryResult = JSON.stringify(res);
				});
			}}
		>
			Client Auth Request
		</button>
		<form method="POST" action="?/testAuth" use:enhance>
			<button class="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
				Server Auth Request
			</button>
		</form>
	</div>
	<div class="flex flex-row gap-5">
		<form
			method="POST"
			action="?/removeAccessToken"
			use:enhance={() => {
				return async ({ result, update }) => {
					queryResult = JSON.stringify(result);
				};
			}}
		>
			<button class="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
				Remove Access Token
			</button>
		</form>
		<form
			method="POST"
			action="?/removeRefreshToken"
			use:enhance={() => {
				return async ({ result, update }) => {
					queryResult = JSON.stringify(result);
				};
			}}
		>
			<button class="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
				Remove Refresh Token
			</button>
		</form>
	</div>

	<div>Currently logged in as</div>
	<div class="flex flex-col pt-16">
		<div>Auth Result</div>
		{#if queryResult}
			<div>{queryResult}</div>
		{/if}
	</div>
</div>
