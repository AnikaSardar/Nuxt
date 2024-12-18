<template>
  <div>
    <h1>Create New User</h1>
    <p v-if="status === 'pending'">Creating new user...We'll redirect you to userlist once we're done.</p>
    <div v-else>
      <form @submit.prevent="createUser">
        <div>
          <label for="full_name">Full Name:</label>
          <input id="full_name" v-model="newUser.full_name" type="text" required />
          <p v-if="validationErrors.full_name" class="error">{{ validationErrors.full_name }}</p>
        </div>
        <div>
          <label for="username">Username:</label>
          <input id="username" v-model="newUser.username" type="text" required />
          <p v-if="validationErrors.username" class="error">{{ validationErrors.username }}</p>
        </div>
        <div>
          <label for="password">Password:</label>
          <input id="password" v-model="newUser.password" type="password" required />
          <p v-if="validationErrors.password" class="error">{{ validationErrors.password }}</p>
        </div>
        <div>
          <label for="email">Email:</label>
          <input id="email" v-model="newUser.email" type="email" required />
          <p v-if="validationErrors.email" class="error">{{ validationErrors.email }}</p>
        </div>
        <div>
          <label for="role">Role:</label>
          <select id="role" v-model="newUser.role_id" required>
            <option v-for="type in newUserRoles" :key="type.id" :value="type.id">{{ type.name }}</option>
          </select>
          <p v-if="validationErrors.role_id" class="error">{{ validationErrors.role_id }}</p>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>

    <p v-if="error">{{ error }}</p>

    <button @click="goBackToUserList" style="margin-top: 10px;">Back to User List</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { z } from 'zod';
import { generateUniqueId } from "./utils/generateUniqueId";

useHead({
  title: 'Create New User',
});

const router = useRouter();
const { fetchWithPost, getRegisteredUserRoles } = useApiService();

// Define Zod schema for validation
const newUserSchema = z.object({
  id: z.number(),
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  email: z.string().email('Invalid email address'),
  full_name: z.string().min(1, 'Full name is required'),
  registration_date: z.string().optional(),
  role_id: z.number(),
});

const newUser = ref({
  id: '',
  username: '',
  password: '',
  email: '',
  full_name: '',
  registration_date: '',
  role_id: '',
});

const error = ref(null);
const status = ref(null);
const validationErrors = ref({});
const newUserRoles = ref([]);

const createUser = async () => {
  try {
    status.value = 'pending';
    newUser.value.registration_date = new Date().toISOString();
    newUser.value.id = generateUniqueId();

    // Clear previous validation errors
    validationErrors.value = {};

    // Validate user data using Zod schema
    newUserSchema.parse(newUser.value);
    
    // If validation passes, submit the form
    const response = await fetchWithPost('/api/eventsRegisteredUsers/registeredUserCreation', newUser.value);
    if (response.error) {
      error.value = 'Failed to create user. Please try again.';
      console.error(response.error);
    } else {
      alert('User created successfully!');
      router.push('/admin/userManagement');
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Map Zod validation errors to specific fields
      err.errors.forEach((e) => {
        validationErrors.value[e.path[0]] = e.message;
      });
      console.error('Validation errors:', err.errors);
    } else {
      error.value = 'An unexpected error occurred.';
      console.error(err);
    }
  } finally {
    status.value = null;
  }
};

const goBackToUserList = () => {
  router.push('/admin/userManagement');
};

const loadUserRole = async () => {
  try {
    const response = await getRegisteredUserRoles();
    console.log("User roles: ", response.roles.value);
    newUserRoles.value = response.roles.value || [];
  } catch (err) {
    console.error('Failed to load user role types:', err);
  }
};

onMounted(() => {
  loadUserRole();
});
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
}

input, select {
  padding: 5px;
  font-size: 16px;
}

button {
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  font-size: 12px;
}
</style>
