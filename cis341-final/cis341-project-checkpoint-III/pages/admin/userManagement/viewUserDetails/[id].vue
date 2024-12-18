<template>
  <div>
    <h1>View User Details</h1>
    <p v-if="status === 'pending'">Loading...</p>
    <div v-else>
      <p>Name: {{ user.full_name }}</p>
      <p>Username: {{ user.username }}</p>
      <p>Id: {{ user.id }}</p>
      <p>Role: {{ user.roleType }}</p>
    </div>

    <p v-if="error">{{ error.statusMessage }}</p>

    <button @click="goBackToUserList" style="margin-top: 10px;">Back to User List</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { z } from 'zod'; // Import Zod for validation

useHead({
  title: 'View User Details'
});

const route = useRoute();
const router = useRouter();
const status = ref('pending');
const user = ref(null);
const error = ref(null);

// Define Zod schema for user validation
const userSchema = z.object({
  id: z.number(),
  full_name: z.string().min(1, 'Full name is required'),
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  roleType: z.string().min(1, 'Role is required'),
});

const fetchUserData = async () => {
  try {
    const response = await fetch(`/api/eventsRegisteredUsers/${route.params.id}`);
    const data = await response.json();

    // Validate the fetched data using Zod
    const parsedUser = userSchema.parse(data);

    user.value = parsedUser;
    status.value = null; // Data has been fetched and validated
  } catch (err) {
    status.value = null; // Data fetching done
    if (err instanceof z.ZodError) {
      error.value = 'Invalid user data received.';
      console.error('Zod validation errors:', err.errors);
    } else {
      error.value = 'An error occurred while fetching user data.';
      console.error(err);
    }
  }
};

// Fetch user data when the component is mounted
onMounted(() => {
  fetchUserData();
});

// Function to go back to the user list and refresh the page
const goBackToUserList = () => {
  router.push('/admin/userManagement').then(() => {
    window.location.reload();
  });
};
</script>

<style scoped>
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
</style>
