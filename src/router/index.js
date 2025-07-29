import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import MapPage from '../views/MapPage.vue';
import ChargerPage from '../components/ChargerPage.vue';
import ChargerListPage from '../views/ChargerListPage.vue'; // ✅ updated import

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/home', component: HomePage, meta: { requiresAuth: true } },
  { path: '/map', component: MapPage, meta: { requiresAuth: true } },
  { path: '/charger-list', component: ChargerListPage, meta: { requiresAuth: true } }, // ✅ updated route
  { path: '/charger-form', component: ChargerPage, meta: { requiresAuth: true } },
  { path: '/:catchAll(.*)', redirect: '/login' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// ✅ Global navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    next('/home');
  } else {
    next();
  }
});

export default router;
