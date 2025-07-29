<template>
  
    <!-- Modal Overlay -->
    <div v-if="isModal" class="modal-backdrop" @click.self="handleClose">
      <div class="modal-content">
        <div class="form-card">
          <h2 class="form-title">{{ id ? 'Update Charger' : 'Add New Charger' }}</h2>

          <form @submit.prevent="addCharger">
            <div class="form-grid">
              <input v-model="name" placeholder="Charger Name" required class="input" />
              <input v-model="status" placeholder="Status (e.g. Active, Inactive)" required class="input" />
              <input v-model="location" placeholder="Location" required class="input" />
              <input v-model="latitude" placeholder="Latitude" type="number" step="any" required class="input" />
              <input v-model="longitude" placeholder="Longitude" type="number" step="any" required class="input" />
            </div>

            <div class="form-actions">
              <button class="btn-primary">{{ id ? 'Update Charger' : 'Add Charger' }}</button>
              <button v-if="id" type="button" @click="resetForm" class="btn-secondary">Cancel Edit</button>
            </div>
          </form>
        </div>
      </div>
    </div>


  <!-- Standalone page layout -->
  <div v-else class="form-wrapper">
    
    <div class="form-card">
      <h2 class="form-title">{{ id ? 'Update Charger' : 'Add New Charger' }}</h2>

      <form @submit.prevent="addCharger">
        <div class="form-grid">
          <input v-model="name" placeholder="Charger Name" required class="input" />
          <input v-model="status" placeholder="Status (e.g. Active, Inactive)" required class="input" />
          <input v-model="location" placeholder="Location" required class="input" />
          <input v-model="latitude" placeholder="Latitude" type="number" step="any" required class="input" />
          <input v-model="longitude" placeholder="Longitude" type="number" step="any" required class="input" />
        </div>

        <div class="form-actions">
          <button class="btn-primary">
            {{ id ? 'Update Charger' : 'Add Charger' }}
          </button>
          <button v-if="id" type="button" @click="resetForm" class="btn-secondary">
            Cancel Edit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ChargerForm from '@/logic/ChargerForm.js';
import '@/css/ChargerForm.css';

export default ChargerForm;
</script>

