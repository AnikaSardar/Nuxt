<template>
    <div>
      <title>{{ title }}</title>

      <div class="col-3">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="username" >Username</label>
          <input v-model="username" type="text" id="username" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" id="password" class="form-control" required />
        </div>
        <button class="btn btn-primary" type="submit">Login</button>
      </form>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>

        <NuxtPage />
    </div>
  </template>

<script setup>
const title = "Login/Sign Up"

const username = ref('');
  const password = ref('');
  const error = ref('');
  const { login } = useAuth();
  const router = useRouter();
  
  // Login function
  const handleLogin = async () => {
    try {
      const success = await login(username.value, password.value);
      // Redirect to home page after successful login
      if(success) {
        await navigateTo('/');
      }
    } catch (err) {
      console.log(err);
      error.value = err.message;  // Show error if login fails
    }
  };
</script>

<style scoped>
</style>