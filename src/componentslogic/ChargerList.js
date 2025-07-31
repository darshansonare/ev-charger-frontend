import Navbar from '../components/Navbar.vue';
import ChargerForm from '../views/ChargerForm.vue';
import axios from 'axios';

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

  // ✅ Add these methods below
  methods: {
    async fetchChargers() {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('https://ev-charger-backend-l1c8.onrender.com/api/chargers', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.chargers = res.data;
      } catch (err) {
        console.error('Error fetching chargers:', err);
      }
    },

    async deleteCharger(id) {
      const token = localStorage.getItem('token');
      await axios.delete(`https://ev-charger-backend-l1c8.onrender.com/api/chargers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.fetchChargers();
    },

    // ✅ THESE TWO ARE THE ONES YOU ASKED ABOUT
    editCharger(charger) {
      this.selectedCharger = charger; // Pass data to ChargerForm
      this.showModal = true;          // Show modal
    },

    closeModal() {
      this.showModal = false;         // Hide modal
      this.selectedCharger = null;    // Clear data
    }
  }
};