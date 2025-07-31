// File: src/views/ChargerListPage.vue or wherever this file is

import Navbar from '../components/Navbar.vue';
import ChargerForm from '../views/ChargerForm.vue';
import axios from '../utils/axios';// ✅ Use your axios instance

export default {
  components: { Navbar, ChargerForm },
  data() {
    return {
      chargers: [],
      searchTerm: '',
      showModal: false,
      selectedCharger: null
    };
  },
  computed: {
    isAdmin() {
      return localStorage.getItem('role') === 'admin';
    },
    filteredChargers() {
      return this.chargers.filter(charger =>
        charger.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  },
  mounted() {
    this.fetchChargers();
  },
  methods: {
    async fetchChargers() {
      try {
        const res = await axios.get('/api/chargers'); // ✅ Base URL handled in axios instance
        this.chargers = res.data;
      } catch (err) {
        console.error('Error fetching chargers:', err);
      }
    },

    async deleteCharger(id) {
      try {
        await axios.delete(`/api/chargers/${id}`); // ✅ Simplified
        this.fetchChargers();
      } catch (err) {
        console.error('Error deleting charger:', err);
      }
    },

    editCharger(charger) {
      this.selectedCharger = charger;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.selectedCharger = null;
    }
  }
};
