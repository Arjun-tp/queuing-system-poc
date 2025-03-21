<script>
    import { queueItems } from '$lib/socket.js';
</script>

<h2 class="text-xl font-bold mb-4">Live Queue</h2>

<ul>
    {#each $queueItems as item (item.timestamp)}
        <li class="mb-2 p-2 rounded bg-gray-100 shadow">
            {item.message} <small class="text-gray-500">({new Date(item.timestamp).toLocaleTimeString()})</small>
        </li>
    {/each}
</ul>
