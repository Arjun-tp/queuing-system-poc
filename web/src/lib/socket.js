import { io } from 'socket.io-client';
import { writable } from 'svelte/store';

const socket = io('http://localhost:7005'); // Backend port

export const queueItems = writable([]);

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

// Listen for real-time updates from backend
socket.on('queue-update', (data) => {
    console.log('Queue update received:', data);
    queueItems.update(items => [data, ...items]); // Prepend to list
});
