<script>
  import { queueItems } from '$lib/socket.js';
  import axios from "axios";
  import { API_URL } from "../config/constant.js";

  function generateRandomString(length = 5) {
    const numbers = '0123456789';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = numbers[Math.floor(Math.random() * numbers.length)];
    for (let i = 1; i < length; i++) {
      const randIndex = Math.floor(Math.random() * chars.length);
      result += chars[randIndex];
    }
    return result;
  }

  async function addToQueue () {
    try {
      const response = await axios.post(`${API_URL}/queue/add-to-queue`, {
        "message":`Appt no: ${generateRandomString()}`
      })
      console.log(response.data)
    } catch (e) {
      console.log(e.response)
      throw e.response
    }
  }

</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
  <div class="w-full max-w-sm bg-white rounded-lg shadow p-5">
    <h2 class="text-lg font-semibold text-center mb-5 text-gray-800 text-success">LIVE QUEUE</h2>
    <div>
      <button class="btn btn-danger px-4 py-2" on:click|preventDefault={addToQueue}>
        Calculate Distance <i class="bi bi-arrow-right ms-2"></i>
      </button>
    </div>
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
