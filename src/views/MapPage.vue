<template>
  <div class="map-wrapper">
    
    <Navbar />
    <div class="map-center">
      <div class="map-card">
        <h2 class="map-title">EV Charger Locations</h2>
        <div class="map-container">
          <MapView :chargers="chargers" />
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import logic from '@/logic/MapPage.js';
import '@/css/MapPage.css';

export default logic;
</script>