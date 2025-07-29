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
  methods: {
    async fetchChargers() {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:3000/api/chargers', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.chargers = res.data;
      } catch (err) {
        console.error('Error fetching chargers:', err);
      }
    },
    async deleteCharger(id) {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/chargers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.fetchChargers();
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