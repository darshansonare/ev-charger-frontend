<!-- RegisterPage.vue -->
<template>
  <div class="container">
    <div class="login-card">
      <!-- Left: Form -->
      <div class="login-form-container">
        <h2 class="title">Create Account</h2>
        <p class="subtitle">Join us and manage your EV chargers easily</p>

        <form @submit.prevent="register" class="form-wrapperr">
          <input v-model="username" type="text" placeholder="Username" required />
          <input v-model="password" type="password" placeholder="Password" required />
          <button type="submit" class="btn-login">Register</button>
        </form>

        <p class="register-text">
          Already have an account? <router-link to="/login">Login here</router-link>
        </p>
      </div>

      <!-- Right: Image -->
      <div class="login-image-container">
        <img src="@/assets/img.png" alt="EV Charger" />
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from '@/logic/RegisterForm';
import '@/css/RegisterForm.css';

export default {
  setup() {
    return RegisterForm();
  }
};
</script>
