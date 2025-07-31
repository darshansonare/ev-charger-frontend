// File: src/logic/ChargerForm.js
import axios from '../axios';
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
          Object.assign(this, { ...newVal });
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
        await this.showAlert('error', 'Authentication Required', 'Please login to continue');
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };
      const chargerData = {
        name: this.name.trim(),
        status: this.status.trim(),
        location: this.location.trim(),
        latitude: parseFloat(this.latitude),
        longitude: parseFloat(this.longitude)
      };

      Swal.fire({
        title: this.id ? 'Updating Charger...' : 'Adding Charger...',
        text: 'Please wait while we process your request',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => Swal.showLoading()
      });

      try {
        const url = this.id ? `/api/chargers/${this.id}` : '/api/chargers';
        const method = this.id ? 'put' : 'post';

        await axios[method](url, chargerData, { headers });

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
        this.$emit('edit', 'success');
        this.resetForm(false);

      } catch (err) {
        console.error('Error submitting charger:', err);

        const status = err.response?.status;
        const defaultMsg = 'Something went wrong. Please try again.';
        const titleMap = {
          400: 'Invalid Data',
          401: 'Unauthorized',
          403: 'Access Denied',
          404: 'Charger Not Found',
          409: 'Duplicate Entry',
          422: 'Validation Error',
          500: 'Server Error'
        };

        const errorTitle = titleMap[status] || (this.id ? 'Update Failed' : 'Addition Failed');
        const errorMessage = err.response?.data?.message || err.message || defaultMsg;

        await this.showAlert('error', errorTitle, errorMessage);
      }
    },

    validateForm() {
      const name = this.name.trim();
      const status = this.status.trim();
      const location = this.location.trim();
      const lat = parseFloat(this.latitude);
      const lng = parseFloat(this.longitude);

      if (!name || !status || !location || isNaN(lat) || isNaN(lng)) {
        this.showAlert('warning', 'Missing Information', 'Please fill in all required fields');
        return false;
      }

      if (name.length < 3) {
        this.showAlert('warning', 'Invalid Charger Name', 'Charger name must be at least 3 characters long');
        return false;
      }

      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        this.showAlert('warning', 'Invalid Coordinates', 'Latitude must be between -90 and 90. Longitude must be between -180 and 180.');
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

      this.$emit('edit', 'cancel');
    },

    handleClose() {
      this.$emit('edit', 'cancel');
    },

    async showAlert(icon, title, text) {
      await Swal.fire({
        icon,
        title,
        text,
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false,
        background: icon === 'error' ? '#fef2f2' : '#fefce8',
        color: icon === 'error' ? '#991b1b' : '#92400e'
      });
    }
  }
};
