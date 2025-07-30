// File: src/logic/LoginForm.js
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function LoginForm() {
  const username = ref('');
  const password = ref('');
  const router = useRouter();

  const login = async () => {
  if (!username.value || !password.value) {
    await Swal.fire({
      icon: 'warning',
      title: 'Missing Information',
      text: 'Please enter both username and password',
      timer: 3000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
      background: '#fefce8',
      color: '#92400e'
    });
    return;
  }

  try {
    const res = await axios.post('http://localhost:3000/api/login', {
      username: username.value,
      password: password.value
    });

    await Swal.fire({
      icon: 'success',
      title: 'Login Successful!',
      text: 'Welcome to EV Charging Dashboard',
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
      background: '#f0f9ff',
      color: '#1e293b'
    });

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', res.data.user.role);
    router.push('/home');
  } catch (err) {
    console.error('Login error:', err);

    let errorTitle = 'Login Failed';
    let errorMessage = 'Something went wrong. Please try again.';
    let errorIcon = 'error';
    let bgColor = '#fef2f2';
    let txtColor = '#991b1b';

    if (err.response) {
      switch (err.response.status) {
        case 400:
          errorTitle = 'Invalid Request';
          errorMessage = 'Please check your username and password format.';
          break;
        case 401:
          errorTitle = 'Access Denied';
          errorMessage = 'Wrong username or password. Please try again.';
          break;
        case 404:
          errorTitle = 'User Not Found';
          errorMessage = 'The username you entered does not exist.';
          break;
        case 500:
          errorTitle = 'Server Error';
          errorMessage = 'Our servers are experiencing issues. Please try again later.';
          break;
        default:
          errorMessage = err.response.data?.message || 'Login failed. Please try again.';
      }
    } else if (err.request) {
      errorTitle = 'Connection Error';
      errorMessage = 'Unable to connect to server. Please check your internet connection.';
    }

    await Swal.fire({
      icon: errorIcon,
      title: errorTitle,
      text: errorMessage,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      background: bgColor,
      color: txtColor
    });

    password.value = '';
  }
};


  return { 
    username, 
    password, 
    login 
  };
}