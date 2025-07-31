import Navbar from '../components/Navbar.vue';
import MapView from '../components/MapView.vue';
import axios from '../axios';


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
      try {
        const res = await axios.get('/api/chargers');
        this.chargers = res.data;
      } catch (err) {
        console.error('Failed to fetch chargers:', err);
      }
    }
  }
};
