export default {
  computed: {
    isAdmin() {
      return localStorage.getItem('role') === 'admin';
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    }
  }
};