<template>
  <div>
    <Navbar />
    <div v-if="isAdmin" class="charger-page">
      <div class="form-container">
        
        <ChargerForm @refresh="fetchChargers" />
      </div>
    </div>

    <div v-else class="text-center mt-10">
      <h2 class="text-xl text-red-600">You are not authorized to view this page.</h2>
    </div>
  </div>
</template>

<script>
import ChargerPage from '@/componentslogic/ChargerPage';

 
export default ChargerPage;
</script>

