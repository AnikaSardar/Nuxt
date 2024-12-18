<template>
  <div>
    <h1>Edit User Details</h1>
    <p v-if="status === 'pending'">Loading...</p>
    <div v-else>
      <form @submit.prevent="saveUserDetails">
        <div>
          <label for="full_name">Full Name:</label>
          <input id="full_name" v-model="editableUser.full_name" type="text" />
          <p v-if="validationErrors.full_name" class="error">{{ validationErrors.full_name }}</p>
        </div>
        <div>
          <label for="username">Username:</label>
          <input id="username" v-model="editableUser.username" type="text" />
          <p v-if="validationErrors.username" class="error">{{ validationErrors.username }}</p>
        </div>
        <div>
          <label for="password">Password:</label>
          <input id="password" v-model="editableUser.password" type="text" />
          <p v-if="validationErrors.password" class="error">{{ validationErrors.password }}</p>
        </div>
        <div>
          <label for="email">Email:</label>
          <input id="email" v-model="editableUser.email" type="text" />
          <p v-if="validationErrors.email" class="error">{{ validationErrors.email }}</p>
        </div>
        <div>
          <p>Role: {{ user.roleType }}</p>
        </div>
        <div>
          <p>Id: {{ user.id }}</p>
        </div>
        <div>
          <p>Registration Date: {{ user.registration_date }}</p>
        </div>
        <button type="submit" @click="goBackToUserList">Update</button>
      </form>
    </div>

    <p v-if="error">{{ error.statusMessage }}</p>

    <button @click="goBackToUserList" style="margin-top: 10px;">Back to User List</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // Import useRouter
import { z } from 'zod';
const { fetchWithPatch } = useApiService();

useHead({
  title: 'Edit User Details',
});

const route = useRoute();
const router = useRouter(); // Initialize the router
const { data: user, error, pending: status } = await useFetch(`/api/eventsRegisteredUsers/${route.params.id}`);

// Create a local editable copy of the user details
const editableUser = ref({
  full_name: user.value?.full_name || '',
  username: user.value?.username || '',
  password: user.value?.password || '',
  email: user.value?.email || '',
});

// Define Zod schema for validation
const userSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  email: z.string().email('Invalid email address'),
});

// Validation errors object
const validationErrors = ref({});

// Function to save user details
const saveUserDetails = async () => {
  try {
    // Validate using Zod schema
    validationErrors.value = {}; // Reset validation errors
    const validationResult = userSchema.safeParse(editableUser.value);

    if (!validationResult.success) {
      // If validation fails, map errors to validationErrors object
      validationResult.error.errors.forEach((err) => {
        validationErrors.value[err.path[0]] = err.message;
      });
      return; // Stop the form submission
    }

    // If validation passes, proceed to save the data
    const updatedUser = {
      id: user.value.id,
      username: editableUser.value.username,
      password: editableUser.value.password,
      email: editableUser.value.email,
      full_name: editableUser.value.full_name,
      registration_date: user.value.registration_date,
      role_id: user.value.role_id,
    };

    const endpoint = `/api/eventsRegisteredUsers/${route.params.id}`;
    const response = await fetchWithPatch(endpoint, updatedUser);

    if (response.error) {
      console.error('Error updating user details:', response.error);
      alert('Failed to update user details. Please try again.');
    } else {
      alert('User details updated successfully!');
    }
  } catch (err) {
    console.error('Error updating user details:', err);
    alert('An unexpected error occurred.');
  }
};

// Function to go back to the user list and refresh the page
const goBackToUserList = () => {
  router.push('/admin/userManagement').then(() => {
    window.location.reload();
  });
};
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

input {
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
