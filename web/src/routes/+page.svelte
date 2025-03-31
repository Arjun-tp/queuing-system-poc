<script>
  import { queueItems } from '$lib/socket.js';
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
  <div class="w-full max-w-sm bg-white rounded-lg shadow p-5">
    <h2 class="text-lg font-semibold text-center mb-5 text-gray-800 text-success">LIVE QUEUE</h2>

    {#if $queueItems.length > 0}
      <div class="space-y-2">
        {#each $queueItems as item (item.timestamp)}
          <div class="text-center bg-gray-100 px-3 py-2 rounded-md shadow-sm text-sm">
            <div class="text-danger"><b>{item.message}</b></div>
            <div class="text-xs text-gray-100 mt-1">
              {new Date(item.timestamp).toLocaleTimeString()}
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-center text-gray-400 text-sm">No messages in the queue yet.</p>
    {/if}
  </div>
</div>
