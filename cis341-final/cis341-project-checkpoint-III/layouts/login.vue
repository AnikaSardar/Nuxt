<template>
  <div class="login-container">
    <title>{{ title }}</title>

    <div class="login-form-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="username">Username</label>
          <input v-model="username" type="text" id="username" class="form-control" />
          <!-- Display validation error for username -->
          <p v-if="validationErrors.username" style="color: red;">{{ validationErrors.username }}</p>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" id="password" class="form-control" />
          <!-- Display validation error for password -->
          <p v-if="validationErrors.password" style="color: red;">{{ validationErrors.password }}</p>
        </div>
        <button class="btn btn-primary" type="submit">Login</button>
      </form>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { z } from 'zod';

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
      integrity: 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH',
      crossorigin: 'anonymous'
    }
  ]
})

const title = "Login/Sign Up";

const username = ref('');
const password = ref('');
const error = ref('');
const validationErrors = ref({
  username: null,
  password: null
});

const { login } = useAuth();
const router = useRouter();

// Define Zod schema for validation
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required').max(50, 'Username cannot exceed 50 characters'),
  password: z.string().min(1, 'Password is required').max(100, 'Password cannot exceed 100 characters')
});

// Login function
const handleLogin = async () => {
  // Clear previous validation errors
  validationErrors.value = {
    username: null,
    password: null
  };

  try {
    // Validate the form data using Zod schema
    loginSchema.parse({
      username: username.value,
      password: password.value
    });

    // Proceed with login if validation passes
    const success = await login(username.value, password.value);
    if (success) {
      await navigateTo('/');
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Map Zod validation errors to validationErrors object
      err.errors.forEach(error => {
        validationErrors.value[error.path[0]] = error.message;
      });
    } else {
      // Handle unexpected errors
      error.value = err.message;
    }
  }
};
</script>

<style scoped>
@import url("~/assets/css/login.css");
</style>
