
<template>
  <div class="container">
    <div class="login-card">
      <!-- Left: Login Form -->
      <div class="login-form-container">
        <h2 class="title">LOGIN</h2>
        <p class="subtitle">Access your dashboard to manage EV charging stations</p>

        <form @submit.prevent="login">
          <input v-model="username" type="text" placeholder="Username" required />
          <input v-model="password" type="password" placeholder="Password" required />

          <div class="remember-me">
            <input type="checkbox" id="remember" />
            <label for="remember">Remember me</label>
          </div>

          <button type="submit" class="btn-login">Login Now</button>
        </form>

        <p class="register-text">
          Not registered? <router-link to="/register">Create an account</router-link>
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
import LoginForm from '@/logic/LoginForm';  
import '@/css/LoginForm.css';              

export default {
  setup() {
    return LoginForm();                     
  }
};
</script>

