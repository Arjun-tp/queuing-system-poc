import { writable } from "svelte/store";

export const toastMessage = writable("");

export function showToast(message) {
	toastMessage.set(message);

	// Auto-hide toast after 3 seconds
	setTimeout(() => {
		toastMessage.set("");
	}, 3000);
}

export function clearToast() {
	toastMessage.set("");
}
