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

    <!--<NuxtLink to="/admin/userManagement">Back to User List</NuxtLink>-->
        <!-- Replaced NuxtLink -->
    <button @click="goBackToUserList" style="margin-top: 10px;">Back to User List</button>

  </div>

</template>

<script setup>
useHead({
    title: 'View User Details'
})

const route = useRoute();
const router = useRouter(); // Initialize the router
const { data: user, error, pending } = await useFetch(`/api/eventsRegisteredUsers/${route.params.id}`);

console.log("Debug: Did not throw error");
console.log(`DATA: ${JSON.stringify(user)}`);

if (error.value) {
console.log(`DATA: ${JSON.stringify(user)}`);
}

// const nuxt = useNuxtApp();
// const route = useRoute();
// const userId = route.params.id;
// const CACHE_KEY = `user-${userId}`;
// const CACHE_TTL = 10 * 1000; // 10 seconds

// Check cache and refetch if needed
// const { data: user, error, status } = await useFetch(`/api/eventsRegisteredUsers/${userId}`, {
//   key: CACHE_KEY,
//   transform(input) {
//     return {
//       ...input,
//       fetchedAt: new Date(),
//     };
//   },
//   getCachedData: (key) => {
//     const data = nuxt.payload.data[key] || nuxt.static.data[key];
//     if (!data) return null;

//     const expirationDate = new Date(data.fetchedAt);
//     expirationDate.setTime(expirationDate.getTime() + CACHE_TTL);
//     return expirationDate.getTime() > Date.now() ? data : null;
//   },
// });

// Function to go back to the user list and refresh the page
const goBackToUserList = () => {
  router.push('/admin/userManagement').then(() => {
    // Force reload the page
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
