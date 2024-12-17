<template>
    <div>
      <h1>Create New User</h1>
      <p v-if="status === 'pending'">Creating new user...We'll redirect you to userlist once we're done.</p>
      <div v-else>
        <form @submit.prevent="createUser">
          <div>
            <label for="full_name">Full Name:</label>
            <input id="full_name" v-model="newUser.full_name" type="text" required />
          </div>
          <div>
            <label for="username">Username:</label>
            <input id="username" v-model="newUser.username" type="text" required />
          </div>
          <div>
            <label for="password">Password:</label>
            <input id="password" v-model="newUser.password" type="password" required />
          </div>
          <div>
            <label for="email">Email:</label>
            <input id="email" v-model="newUser.email" type="email" required />
          </div>
          <div>
            <label for="role">Role:</label>
            <select id="role" v-model="newUser.role_id" required>
              <option value=1>Admin</option>
              <option value=2>Event Owner</option>
              <option value=3>Registered User</option>
            </select>
          </div>
          <button type="submit" @click="goBackToUserList">Save</button>
        </form>
      </div>
  
      <p v-if="error">{{ error }}</p>
  
      <button @click="goBackToUserList" style="margin-top: 10px;">Back to User List</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { generateUniqueId } from "./utils/generateUniqueId";

  useHead({
  title: 'Create New User',
});
  
  const router = useRouter();
  const { fetchWithPost } = useApiService(); // Replace this with your actual API call function
  
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
  
  const createUser = async () => {
    try {
      status.value = 'pending';
      // Assign the current date as the registration_date
      newUser.value.registration_date = new Date().toISOString();
      newUser.value.id = generateUniqueId();
      newUser.value.role_id = parseInt(newUser.value.role_id, 10); // Converts to integer
      const response = await fetchWithPost('/api/eventsRegisteredUsers/registeredUserCreation', newUser.value);
      if (response.error) {
        error.value = 'Failed to create user. Please try again.';
        console.error(response.error);
      } else {
        alert('User created successfully!');
        //router.push('/admin/userManagement');
      }
    } catch (err) {
      error.value = 'An unexpected error occurred.';
      console.error(err);
    } finally {
      status.value = null;
    }
  };
  
  const goBackToUserList = () => {
    router.push('/admin/userManagement');
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
  </style>
  