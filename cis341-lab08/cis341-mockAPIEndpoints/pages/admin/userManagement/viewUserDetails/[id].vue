<template>
  <div>
    <h1>View User Details</h1>
    <p v-if="status === 'pending'">Loading...</p>
    <div v-else>
      <p>Name: {{ user.name }}</p>
      <p>Username: {{ user.username }}</p>
      <p>Id: {{ user.id }}</p>
      <p>Role: {{ user.role }}</p>
    </div>

    <p v-if="error">{{ error.statusMessage }}</p>

    <NuxtLink to="/admin/userManagement">Back to User List</NuxtLink>
  </div>

</template>

<script setup>
useHead({
    title: 'View User Details'
})

definePageMeta({
    middleware: ['admin-auth'],  // Apply the adminAuth middleware to this page
  });

const nuxt = useNuxtApp();
const route = useRoute();
const userId = route.params.id;
const CACHE_KEY = `user-${userId}`;
const CACHE_TTL = 10 * 1000; // 10 seconds

// Check cache and refetch if needed
const { data: user, error, status } = await useFetch(`/api/users/${userId}`, {
  key: CACHE_KEY,
  transform(input) {
    return {
      ...input,
      fetchedAt: new Date(),
    };
  },
  getCachedData: (key) => {
    const data = nuxt.payload.data[key] || nuxt.static.data[key];
    if (!data) return null;

    const expirationDate = new Date(data.fetchedAt);
    expirationDate.setTime(expirationDate.getTime() + CACHE_TTL);
    return expirationDate.getTime() > Date.now() ? data : null;
  },
});
</script>

<style scoped></style>
