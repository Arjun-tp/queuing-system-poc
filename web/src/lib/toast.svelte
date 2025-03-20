<script>
	import { toastMessage, clearToast } from '../lib/stores/toastStore.js';
	let show = false;

	async function closeToast() {
		show = false;
		setTimeout(clearToast, 300); // Clear message after fade-out
	}

	$: if ($toastMessage) {
		show = true;
		setTimeout(() => {
			closeToast();
		}, 3000);
	}
</script>

{#if $toastMessage}
	<div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1050;">
		<div class="toast show bg-danger text-white" role="alert" aria-live="assertive" aria-atomic="true">
			<div class="d-flex">
				<div class="toast-body">
					{ $toastMessage }
				</div>
				<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" on:click={closeToast}></button>
			</div>
		</div>
	</div>
{/if}
