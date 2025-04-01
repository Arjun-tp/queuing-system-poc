<script>
  import { queueItems } from '$lib/socket.js';
  import axios from "axios";
  import { API_URL } from "../config/constant.js";

  let page = 1;
  let limit = 10;
  let totalPages = 1;

  // Writable store to hold queue items
  queueItems.set([]);

  function generateRandomString(length = 5) {
    const numbers = '0123456789';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = numbers[Math.floor(Math.random() * numbers.length)];
    for (let i = 1; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  async function fetchQueue() {
    try {
      const res = await axios.get(`${API_URL}/queue?page=${page}&limit=${limit}`);
      queueItems.set(res.data.data);
      totalPages = res.data.totalPages;
    } catch (err) {
      console.error("Failed to fetch queue:", err);
    }
  }

  async function addToQueue () {
    try {
      await axios.post(`${API_URL}/queue/add-to-queue`, {
        message: `${generateRandomString()}`
      });
      await fetchQueue();
    } catch (e) {
      console.error(e?.response || e);
    }
  }

  function nextPage() {
    if (page < totalPages) {
      page++;
      fetchQueue();
    }
  }

  function prevPage() {
    if (page > 1) {
      page--;
      fetchQueue();
    }
  }

  fetchQueue();
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
  <div class="w-full max-w-sm bg-white rounded-lg shadow p-5">
    <h2 class="text-lg font-semibold text-center mb-5 text-gray-800 text-success">LIVE QUEUE</h2>
    <div class="text-center">
      <button class="btn btn-danger px-4 py-2" on:click|preventDefault={addToQueue}>
        Add to queue <i class="bi bi-arrow-right ms-2"></i>
      </button>
    </div>

    {#if $queueItems.length > 0}
      <div class="space-y-2 mt-4">
        {#each $queueItems as item (item._id)}
          <div class="text-center bg-gray-100 px-3 py-2 rounded-md shadow-sm text-sm">
            <div class="text-danger"><b>Appt no: {item.queueNo}</b></div>
            <div class="text-xs text-gray-500 mt-1">
              {new Date(item.createdAt).toLocaleTimeString()}
            </div>
          </div>
        {/each}
      </div>

      <!-- Bootstrap Pagination -->
      <div class="d-flex justify-content-between mt-3">
        <button class="btn btn-outline-dark" on:click={prevPage} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button class="btn btn-outline-dark" on:click={nextPage} disabled={page === totalPages}>Next</button>
      </div>

    {:else}
      <p class="text-center mt-4">No queue items available.</p>
    {/if}
  </div>
</div>
