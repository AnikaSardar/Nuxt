<template>
  <div>
      <div>
          <h1>User List</h1>
          <p v-if="status === 'pending'">Loading...</p>
          <div v-else>
            <button @click="createUser" style="margin-bottom: 20px;">Create New User</button>
              <ul>
                  <li v-for="user in users" :key="user.id" >
                      <NuxtLink :to="`/admin/userManagement/viewUserDetails/${user.id}`"> Name: {{ user?.full_name }} |
                          Username: {{
                              user?.username }} | Id: {{ user?.id }} | Role: {{ user?.role_id}} |</NuxtLink>
                              <button @click="editUser(user.id)">Edit</button>
                              <button @click="deleteUserById(user.id)">Delete</button>
                  </li>

              </ul>
          </div>
          <p v-if="error">{{ error.statusMessage }}</p>
      </div>
  </div>

</template>

<script setup>

import { useRouter } from 'vue-router'; // Import the useRouter hook
const router = useRouter(); // Initialize the router instance

const { deleteRegisteredUser, getRegisteredUsers } = useApiService();

const users = ref([]);
const error = ref(null);
const status = ref('pending');

try {
  const response = await getRegisteredUsers();
  
  // Access the events array inside the RefImpl
  if (response.users && Array.isArray(response.users.value)) {
    users.value = response.users.value; // Assign the actual array
    status.value = 'success';
  } else {
    console.error('Unexpected response format:', response);
    throw new Error('Invalid response format');
  }
} catch (err) {
  console.error('Error fetching events:', err);
  error.value = err;
  status.value = 'error';
}

// Navigate to the edit page when the Edit button is clicked
const editUser = (userId) => {
  console.log(`in editUser, userId: ${userId}`);
  router.push(`/admin/userManagement/editUserDetails/${userId}`);
};

// Navigate to the create page when the create button is clicked
const createUser = () => {
  console.log("in here:")
  router.push(`/admin/userManagement/createUserDetails`);
};

// Confirm deletion
const deleteUserById = async (userId) => {
  if (!confirm(`Are you sure you want to delete the user with ID ${userId}?`)) {
    return;
  }

  try {
    await deleteRegisteredUser(userId); // Call the API to delete the user
    alert('User deleted successfully!');
    window.location.reload();
   
  } catch (err) {
    console.error('Error deleting user:', err);
    alert('Failed to delete user. Please try again.');
  }
};


</script>

<style scoped>
@import url("~/assets/css/form.css");
</style>
