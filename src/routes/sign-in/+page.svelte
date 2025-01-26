<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="form-container">
	<form method="POST" use:enhance>
		<input type="text" name="username" placeholder="Username" value="test" />
		<input type="password" name="password" placeholder="Password" value="test" />
		<input type="submit" />
	</form>
</div>

<style>
	.form-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #121212;
		color: #fff;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 20px;
		border: 1px solid #444;
		border-radius: 5px;
		background-color: #1e1e1e;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	}

	input[type='text'],
	input[type='password'] {
		padding: 10px;
		border: 1px solid #444;
		border-radius: 3px;
		background-color: #333;
		color: #fff;
	}

	input[type='submit'] {
		padding: 10px;
		border: none;
		border-radius: 3px;
		background-color: #ff0000;
		color: #fff;
		cursor: pointer;
	}

	input[type='submit']:hover {
		background-color: #cc0000;
	}
</style>
