
import Navbar from '../components/Navbar.vue';
import ChargerForm from '../views/ChargerForm.vue';

export default {
  components: { Navbar, ChargerForm },
  computed: {
    isAdmin() {
      return localStorage.getItem('role') === 'admin'; // ✅ Role check
    }
  },
  methods: {
    fetchChargers() {
      // Optional refresh logic if needed
    }
  }
};
