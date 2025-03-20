<script>
  import axios from 'axios';
  import {API_URL} from '../config/constant.js'
  import Toast from "../lib/toast.svelte";
  import { showToast } from "../lib/stores/toastStore.js";
  
  let source = '';
  let destination = '';
  let unit = 'both';
  let distance = null;
  let kmDistance = null;
  let milesDistance = null;
  let errorMessage = '';


  async function calculate() {
    errorMessage = '';
    distance = null;

    if (!source || !destination) {
      errorMessage = 'Please enter both source and destination.';
      showToast(errorMessage);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/location/distance`, {
        source,
        destination
      });

      kmDistance = (parseFloat(response.data.distanceInKMs)).toFixed(2);
      milesDistance = (kmDistance * 0.621371).toFixed(2);

    } catch (err) {
      if (err?.response?.status === 429) {
        errorMessage = err.response.data
      } else if(err?.response?.data?.error?.message){
        errorMessage = err.response.data.error.message
      } else {
        errorMessage = `Failed to fetch distance. Please try again.`;
      }
      showToast(errorMessage)
    }
  }

</script>

<Toast />

<main class="container mt-5">
  <div class="card shadow-sm">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h2 class="h5 m-0">Distance Calculator</h2>
      <a href="/history" class="btn btn-outline-dark">View Historical Queries</a>
    </div>

    <div class="card-body">
      <p class="text-muted">Enter the details</p>
      <!-- Input Fields -->
      <div class="row mt-3">
        <div class="col-md-6">
          <label class="form-label">Source</label>
          <input type="text" class="form-control" bind:value={source} placeholder="Enter Source Address" />
        </div>
        <div class="col-md-6">
          <label class="form-label">Destination</label>
          <input type="text" class="form-control" bind:value={destination} placeholder="Enter Destination Address" />
        </div>
      </div>

      <!-- Calculate Button -->
      <div class="mt-4 text-center">
        <button class="btn btn-danger px-4 py-2" on:click={calculate()} disabled={!destination || !source}>
          Calculate Distance <i class="bi bi-arrow-right ms-2"></i>
        </button>
      </div>

    </div>
  </div>
</main>
