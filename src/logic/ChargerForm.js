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
      // Client-side validation
      if (!this.validateForm()) {
        return;
      }

      const token = localStorage.getItem('token');
      
      // Check if user is authenticated
      if (!token) {
        await Swal.fire({
          icon: 'error',
          title: 'Authentication Required',
          text: 'Please login to continue',
          confirmButtonText: 'OK',
          confirmButtonColor: '#4f46e5'
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

      // Show loading alert
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
        let response;
        if (this.id) {
          response = await axios.put(`http://localhost:3000/api/chargers/${this.id}`, chargerData, { headers });
        } else {
          response = await axios.post(`http://localhost:3000/api/chargers`, chargerData, { headers });
        }

        // Success alert
        await Swal.fire({
          icon: 'success',
          title: this.id ? 'Charger Updated!' : 'Charger Added!',
          text: this.id ? 
            `${this.name} has been successfully updated` : 
            `${this.name} has been successfully added to your network`,
          confirmButtonText: 'Great!',
          confirmButtonColor: '#4f46e5',
          background: '#ffffff',
          color: '#1e293b',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            content: 'custom-swal-content'
          }
        });

        // Emit events and reset form
        this.$emit('refresh');
        this.$emit('edit', null);
        this.resetForm();

      } catch (err) {
        console.error('Error submitting charger:', err);
        
        let errorTitle = this.id ? 'Update Failed' : 'Addition Failed';
        let errorMessage = 'Something went wrong. Please try again.';
        
        if (err.response) {
          switch (err.response.status) {
            case 400:
              errorTitle = 'Invalid Data';
              errorMessage = 'Please check all fields and ensure coordinates are valid numbers.';
              break;
            case 401:
              errorTitle = 'Unauthorized';
              errorMessage = 'Your session has expired. Please login again.';
              break;
            case 403:
              errorTitle = 'Access Denied';
              errorMessage = 'You don\'t have permission to perform this action.';
              break;
            case 404:
              errorTitle = 'Charger Not Found';
              errorMessage = 'The charger you\'re trying to update no longer exists.';
              break;
            case 409:
              errorTitle = 'Duplicate Entry';
              errorMessage = 'A charger with this name or location already exists.';
              break;
            case 422:
              errorTitle = 'Validation Error';
              errorMessage = err.response.data?.message || 'Please check your input data.';
              break;
            case 500:
              errorTitle = 'Server Error';
              errorMessage = 'Our servers are experiencing issues. Please try again later.';
              break;
            default:
              errorMessage = err.response.data?.message || errorMessage;
          }
        } else if (err.request) {
          errorTitle = 'Connection Error';
          errorMessage = 'Unable to connect to server. Please check your internet connection.';
        }

        // Error alert with retry option
        const result = await Swal.fire({
          icon: 'error',
          title: errorTitle,
          text: errorMessage,
          showCancelButton: true,
          confirmButtonText: 'Try Again',
          cancelButtonText: 'Cancel',
          confirmButtonColor: '#4f46e5',
          cancelButtonColor: '#6b7280',
          background: '#ffffff',
          color: '#1e293b',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            content: 'custom-swal-content'
          }
        });

        // If user wants to try again, don't close the form
        if (!result.isConfirmed) {
          this.handleClose();
        }
      }
    },

    validateForm() {
      // Check for empty fields
      if (!this.name.trim() || !this.status.trim() || !this.location.trim() || 
          !this.latitude || !this.longitude) {
        Swal.fire({
          icon: 'warning',
          title: 'Missing Information',
          text: 'Please fill in all required fields',
          confirmButtonText: 'OK',
          confirmButtonColor: '#4f46e5'
        });
        return false;
      }

      // Validate charger name
      if (this.name.trim().length < 3) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid Charger Name',
          text: 'Charger name must be at least 3 characters long',
          confirmButtonText: 'OK',
          confirmButtonColor: '#4f46e5'
        });
        return false;
      }

      // Validate coordinates
      const lat = parseFloat(this.latitude);
      const lng = parseFloat(this.longitude);
      
      if (isNaN(lat) || isNaN(lng)) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid Coordinates',
          text: 'Please enter valid numbers for latitude and longitude',
          confirmButtonText: 'OK',
          confirmButtonColor: '#4f46e5'
        });
        return false;
      }

      // Validate latitude range (-90 to 90)
      if (lat < -90 || lat > 90) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid Latitude',
          text: 'Latitude must be between -90 and 90 degrees',
          confirmButtonText: 'OK',
          confirmButtonColor: '#4f46e5'
        });
        return false;
      }

      // Validate longitude range (-180 to 180)
      if (lng < -180 || lng > 180) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid Longitude',
          text: 'Longitude must be between -180 and 180 degrees',
          confirmButtonText: 'OK',
          confirmButtonColor: '#4f46e5'
        });
        return false;
      }

      return true;
    },

    async resetForm() {
      // Show confirmation dialog when editing
      if (this.id) {
        const result = await Swal.fire({
          icon: 'question',
          title: 'Cancel Editing?',
          text: 'Are you sure you want to cancel? Any unsaved changes will be lost.',
          showCancelButton: true,
          confirmButtonText: 'Yes, Cancel',
          cancelButtonText: 'Continue Editing',
          confirmButtonColor: '#6b7280',
          cancelButtonColor: '#4f46e5',
          background: '#ffffff',
          color: '#1e293b'
        });

        if (!result.isConfirmed) {
          return;
        }
      }

      // Reset form data
      this.name = '';
      this.status = '';
      this.location = '';
      this.latitude = '';
      this.longitude = '';
      this.id = null;
      this.$emit('edit', null);

      // Show reset confirmation for standalone form
      if (!this.isModal) {
        Swal.fire({
          icon: 'info',
          title: 'Form Reset',
          text: 'All fields have been cleared',
          timer: 1500,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
          background: '#f0f9ff',
          color: '#1e293b'
        });
      }
    },

    handleClose() {
      this.$emit('edit', null);
    }
  }
};