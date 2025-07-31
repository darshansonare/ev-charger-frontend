// File: src/logic/ChargerForm.js
import axios from 'axios';
import Navbar from '../components/Navbar.vue';
import Swal from 'sweetalert2';

export default {
  props: {
    chargerToEdit: Object,
    isModal: {
      type: Boolean,
      default: false
    }
  },
  components: { Navbar },
  emits: ['refresh', 'edit'],
  data() {
    return {
      name: '',
      status: '',
      location: '',
      latitude: '',
      longitude: '',
      id: null
    };
  },
  watch: {
    chargerToEdit: {
      handler(newVal) {
        if (newVal) {
          this.name = newVal.name;
          this.status = newVal.status;
          this.location = newVal.location;
          this.latitude = newVal.latitude;
          this.longitude = newVal.longitude;
          this.id = newVal.id;
        }
      },
      immediate: true
    }
  },
  methods: {
    async addCharger() {
      if (!this.validateForm()) return;

      const token = localStorage.getItem('token');
      if (!token) {
        await Swal.fire({
          icon: 'error',
          title: 'Authentication Required',
          text: 'Please login to continue',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
          background: '#fef2f2',
          color: '#991b1b'
        });
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };
      const chargerData = {
        name: this.name,
        status: this.status,
        location: this.location,
        latitude: parseFloat(this.latitude),
        longitude: parseFloat(this.longitude)
      };

      Swal.fire({
        title: this.id ? 'Updating Charger...' : 'Adding Charger...',
        text: 'Please wait while we process your request',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        if (this.id) {
          await axios.put(`https://ev-charger-backend-l1c8.onrender.com/api/chargers/${this.id}`, chargerData, { headers });
        } else {
          await axios.post(`https://ev-charger-backend-l1c8.onrender.com/api/chargers`, chargerData, { headers });
        }

        await Swal.fire({
          icon: 'success',
          title: this.id ? 'Charger Updated!' : 'Charger Added!',
          text: `${this.name} has been successfully ${this.id ? 'updated' : 'added to your network'}`,
          toast: true,
          position: 'top-end',
          timer: 2500,
          showConfirmButton: false,
          background: '#f0fdf4',
          color: '#065f46'
        });

        this.$emit('refresh');
        this.$emit('edit', 'success'); // 👍 emit success instead of null
        this.resetForm(false);

      } catch (err) {
        console.error('Error submitting charger:', err);
        let errorTitle = this.id ? 'Update Failed' : 'Addition Failed';
        let errorMessage = 'Something went wrong. Please try again.';

        if (err.response) {
          const status = err.response.status;
          errorTitle = {
            400: 'Invalid Data',
            401: 'Unauthorized',
            403: 'Access Denied',
            404: 'Charger Not Found',
            409: 'Duplicate Entry',
            422: 'Validation Error',
            500: 'Server Error'
          }[status] || errorTitle;

          errorMessage = err.response.data?.message || errorMessage;
        } else if (err.request) {
          errorTitle = 'Connection Error';
          errorMessage = 'Unable to connect to server. Please check your internet connection.';
        }

        await Swal.fire({
          icon: 'error',
          title: errorTitle,
          text: errorMessage,
          toast: true,
          position: 'top-end',
          timer: 4000,
          showConfirmButton: false,
          background: '#fef2f2',
          color: '#991b1b'
        });
      }
    },

    validateForm() {
      if (!this.name.trim() || !this.status.trim() || !this.location.trim() ||
          !this.latitude || !this.longitude) {
        Swal.fire({
          icon: 'warning',
          title: 'Missing Information',
          text: 'Please fill in all required fields',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
          background: '#fefce8',
          color: '#92400e'
        });
        return false;
      }

      if (this.name.trim().length < 3) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid Charger Name',
          text: 'Charger name must be at least 3 characters long',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
          background: '#fefce8',
          color: '#92400e'
        });
        return false;
      }

      const lat = parseFloat(this.latitude);
      const lng = parseFloat(this.longitude);

      if (isNaN(lat) || isNaN(lng)) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid Coordinates',
          text: 'Please enter valid numbers for latitude and longitude',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
          background: '#fefce8',
          color: '#92400e'
        });
        return false;
      }

      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid Latitude or Longitude',
          text: 'Latitude must be between -90 and 90. Longitude must be between -180 and 180.',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
          background: '#fefce8',
          color: '#92400e'
        });
        return false;
      }

      return true;
    },

    async resetForm(showCancel = true) {
      if (this.id && showCancel) {
        const result = await Swal.fire({
          icon: 'question',
          title: 'Cancel Editing?',
          text: 'Are you sure you want to cancel? Unsaved changes will be lost.',
          showCancelButton: true,
          confirmButtonText: 'Yes, Cancel',
          cancelButtonText: 'Continue Editing',
          confirmButtonColor: '#6b7280',
          cancelButtonColor: '#4f46e5',
          background: '#ffffff',
          color: '#1e293b'
        });

        if (!result.isConfirmed) return;
      }

      this.name = '';
      this.status = '';
      this.location = '';
      this.latitude = '';
      this.longitude = '';
      this.id = null;

      this.$emit('edit', 'cancel'); // 👍 emit cancel instead of null
    },

    handleClose() {
      this.$emit('edit', 'cancel'); // fallback handler
    }
  }
};
