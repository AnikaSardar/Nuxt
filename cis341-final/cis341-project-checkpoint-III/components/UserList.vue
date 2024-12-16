<template>
  <div>
      <div>
          <h1>User List</h1>
          <p v-if="status === 'pending'">Loading...</p>
          <div v-else>
              <ul>
                  <li v-for="user in users" :key="user.id" >
                      <NuxtLink :to="`/admin/userManagement/viewUserDetails/${user.id}`"> Name: {{ user.full_name }} |
                          Username: {{
                              user.username }} | Id: {{ user.id }} | Role: {{ user.role_id}} |</NuxtLink>
                              <button @click="editUser(user.id)">Edit</button>
                              <button @click="deleteUser(user.id)">Delete</button>
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

const userDetails = ref([])
const { getRegisteredUserDetails } = useApiService();

const response = await getRegisteredUserDetails(1);
userDetails.value = response.user.value.roleType; 

console.log("Userdetails.value: ", userDetails.value);

const nuxt = useNuxtApp();
//const CACHE_KEY = 'users';
const CACHE_KEY = 'eventsRegisteredUsers';
const CACHE_TTL = 10 * 1000; // 10 seconds

// Check cache and refetch if needed
const { data: users, error, status } = await useFetch('/api/eventsRegisteredUsers', {
key: CACHE_KEY,
transform(input) {
  return {
    ...input,
    fetchedAt: new Date(),
  };
},
getCachedData: (key) => {
  const data = nuxt.payload.data[key] || nuxt.static.data[key];
  if (!data) return;

  const expirationDate = new Date(data.fetchedAt);
  expirationDate.setTime(expirationDate.getTime() + CACHE_TTL);
  const isExpired = expirationDate.getTime() < Date.now();
    if(isExpired) {
      return
    }

    // Return cached data
    return data;
},
});

// Navigate to the edit page when the Edit button is clicked
const editUser = (userId) => {
  console.log("in here:")
  router.push(`/admin/userManagement/editUserDetails/${userId}`);
};

</script>

<style scoped>
@import url("~/assets/css/form.css");
</style>
