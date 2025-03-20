<script>
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { API_URL } from '../../config/constant.js'
  import Toast from "../../lib/toast.svelte";
  import { showToast } from "../../lib/stores/toastStore.js";


  let history = [];
  let errorMessage = '';
  let page = 1;
  let limit = 5;
  let totalPages = 1;

  async function fetchHistory() {
    try {
      const response = await axios.get(`${API_URL}/history?page=${page}&limit=${limit}`);
      history = response.data.data;
      totalPages = response.data.totalPages;
    } catch (error) {
      if(error?.response?.data){
        errorMessage = error?.response?.data
      } else {
        errorMessage = `Failed to fetch history. Please try again`;
      }
      showToast(errorMessage);
    }
  }

  function nextPage() {
    if (page < totalPages) {
      page++;
      fetchHistory();
    }
  }

  function prevPage() {
    if (page > 1) {
      page--;
      fetchHistory();
    }
  }

  onMount(fetchHistory);
</script>

<Toast />

<main class="container mt-5">
  <div class="d-flex justify-content-between align-items-center">
    <h1 class="display-5">Historical Queries</h1>
    <a href="/" class="btn btn-outline-dark">Go Back</a>
  </div>

  <!--{#if errorMessage}-->
  <!--  <p class="text-danger">{errorMessage}</p>-->
  <!--{/if}-->

  {#if history.length > 0}
    <table class="table table-bordered mt-3">
      <thead class="table-dark">
      <tr>
        <th>#</th>
        <th>Source</th>
        <th>Date</th>
      </tr>
      </thead>
      <tbody>
      {#each history as entry, index}
        <tr>
          <td>{(page - 1) * limit + index + 1}</td>
          <td>{entry.source.name}</td>
          <td>{new Date(entry.createdAt).toLocaleString('en-GB', { hour12: true })}</td>
        </tr>
      {/each}
      </tbody>
    </table>

    <!-- Bootstrap Pagination -->
    <div class="d-flex justify-content-between mt-3">
      <button class="btn btn-outline-dark" on:click={prevPage} disabled={page === 1}>Previous</button>
      <span>Page {page} of {totalPages}</span>
      <button class="btn btn-outline-dark" on:click={nextPage} disabled={page === totalPages}>Next</button>
    </div>

  {:else}
    <p class="text-center mt-4">No history available.</p>
  {/if}
</main>
