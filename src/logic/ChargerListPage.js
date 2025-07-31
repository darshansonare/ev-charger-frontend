import Navbar from '../components/Navbar.vue';
import ChargerForm from '../views/ChargerForm.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

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
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to delete this charger?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#4f46e5'
      });

      if (!result.isConfirmed) return;

      const token = localStorage.getItem('token');
      try {
        await axios.delete(`https://ev-charger-backend-l1c8.onrender.com/api/chargers/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.fetchChargers();
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The charger has been deleted.',
          toast: true,
          position: 'top-end',
          timer: 2500,
          showConfirmButton: false,
          background: '#f0fdf4',
          color: '#065f46'
        });
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Failed to delete',
          text: 'Something went wrong. Please try again later.',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
          background: '#fef2f2',
          color: '#991b1b'
        });
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
