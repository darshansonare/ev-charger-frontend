// File: src/logic/RegisterForm.js
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import axios from '../axios';
export default function RegisterForm() {
  const username = ref('');
  const password = ref('');
  const router = useRouter();

  const register = async () => {
    debugger
    // Basic validation
    if (!username.value || !password.value) {
      await Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all required fields',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2563eb'
      });
      return;
    }

    // Password strength validation
    if (password.value.length < 6) {
      await Swal.fire({
        icon: 'warning',
        title: 'Weak Password',
        text: 'Password must be at least 6 characters long',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2563eb'
      });
      return;
    }

    // Username validation
    if (username.value.length < 3) {
      await Swal.fire({
        icon: 'warning',
        title: 'Invalid Username',
        text: 'Username must be at least 3 characters long',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2563eb'
      });
      return;
    }

    try {
    await axios.post('/api/register', {
               username: username.value,
               password: password.value
          }); 
      
      // Success alert with redirect confirmation
      const result = await Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Your account has been created. You will be redirected to login.',
        showCancelButton: true,
        confirmButtonText: 'Login Now',
        cancelButtonText: 'Stay Here',
        confirmButtonColor: '#2563eb',
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

      if (result.isConfirmed) {
        // Show loading toast while redirecting
        Swal.fire({
          title: 'Redirecting...',
          text: 'Taking you to login page',
          timer: 1000,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
          background: '#f0f9ff',
          color: '#1e293b',
          didOpen: () => {
            Swal.showLoading();
          }
        });
        
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      }
      
    } catch (err) {
      console.error('Registration error:', err);
      
      let errorTitle = 'Registration Failed';
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (err.response) {
        switch (err.response.status) {
          case 400:
            errorTitle = 'Invalid Data';
            errorMessage = 'Please check your username and password format.';
            break;
          case 409:
            errorTitle = 'Username Taken';
            errorMessage = 'This username is already registered. Please choose a different one.';
            break;
          case 422:
            errorTitle = 'Validation Error';
            errorMessage = err.response.data?.message || 'Please check your input and try again.';
            break;
          case 500:
            errorTitle = 'Server Error';
            errorMessage = 'Our servers are experiencing issues. Please try again later.';
            break;
          default:
            errorMessage = err.response.data?.message || 'Registration failed. Please try again.';
        }
      } else if (err.request) {
        errorTitle = 'Connection Error';
        errorMessage = 'Unable to connect to server. Please check your internet connection.';
      }

      // Error alert with retry option
      const retryResult = await Swal.fire({
        icon: 'error',
        title: errorTitle,
        text: errorMessage,
        showCancelButton: true,
        confirmButtonText: 'Try Again',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#2563eb',
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

      // Clear form if user cancels or if username is taken
      if (!retryResult.isConfirmed || err.response?.status === 409) {
        if (err.response?.status === 409) {
          username.value = ''; // Clear username if taken
        }
        password.value = ''; // Always clear password on error
      }
    }
  };

  return { 
    username, 
    password, 
    register 
  };
}