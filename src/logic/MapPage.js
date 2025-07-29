
import Navbar from '../components/Navbar.vue';
import MapView from '../components/MapView.vue';
import axios from 'axios';

export default {
  components: { Navbar, MapView },
  data() {
    return {
      chargers: []
    };
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
        console.error('Failed to fetch chargers:', err);
      }
    }
  }
};


