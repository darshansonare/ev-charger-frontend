<template>
  <div>
    <h2 class="text-xl font-bold mb-3">Charger List</h2>
    <table class="min-w-full bg-white shadow rounded">
      <thead>
        <tr class="bg-gray-200 text-left">
          <th class="p-3">Name</th>
          <th class="p-3">Status</th>
          <th class="p-3">Location</th>
          <th class="p-3" v-if="isAdmin">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="charger in chargers" :key="charger.id" class="border-b">
          <td class="p-3">{{ charger.name }}</td>
          <td class="p-3">{{ charger.status }}</td>
          <td class="p-3">{{ charger.location }}</td>
          <td class="p-3 flex gap-4" v-if="isAdmin">
            <button @click="openEditModal(charger)" class="text-blue-600">Edit</button>
            <button @click="deleteCharger(charger.id)" class="text-red-600">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Edit Form -->
    <ChargerForm
     v-if="showModal"
     :chargerToEdit="selectedCharger"
     :isModal="true"
     @edit="closeModal"
     @refresh="fetchChargers"
     />
  </div>
</template>

<script>
import ChargerList from '@/componentslogic/ChargerList.js';


export default ChargerList;
</script>