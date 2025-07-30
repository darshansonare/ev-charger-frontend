<template>
  <div class="list-wrapper">
    <Navbar />

    <div class="card">
      <div class="header-row">
        <h2 class="title2">All ev chargers</h2>
        <input v-model="searchTerm" placeholder="Search by charger name..." class="search-input" />
      </div>

      <table class="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Location</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th v-if="isAdmin">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="charger in filteredChargers" :key="charger.id" class="row">
            <td>{{ charger.name }}</td>
            <td>
              <span :class="['status-pill', charger.status.toLowerCase()]">
                {{ charger.status }}
              </span>
            </td>
            <td>{{ charger.location }}</td>
            <td>{{ charger.latitude }}</td>
            <td>{{ charger.longitude }}</td>
            <td v-if="isAdmin">
              <div class="actions">
                <button @click="editCharger(charger)" class="edit">Edit</button>
                <button @click="deleteCharger(charger.id)" class="delete">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Form -->
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
import ChargerListPage from '@/logic/ChargerListPage.js';
import '@/css/ChargerListPage.css';

export default ChargerListPage;
</script>


