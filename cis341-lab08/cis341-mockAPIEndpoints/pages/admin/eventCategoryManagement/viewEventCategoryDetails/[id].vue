<template>
    <div>
  
      <h1>View Event Category Details</h1>
      <p>Name: {{ eventCategory.name }}</p>
      <p>Id: {{ eventCategory.id }}</p>
  
      <NuxtLink to="/admin/eventCategoryManagement">Back to Event Category List</NuxtLink>

    </div>
  
  </template>
  
  <script setup>
  
  useHead({
    title: 'View Event Category Details'
  });

  definePageMeta({
    middleware: ['admin-auth'],  // Apply the adminAuth middleware to this page
  });
  
const nuxt = useNuxtApp();
const route = useRoute();
const eventCategoryId = route.params.id;
const CACHE_KEY = `eventCategory-${eventCategoryId}`;
const CACHE_TTL = 10 * 1000; // 10 seconds

// Check cache and refetch if needed
const { data: eventCategory, error } = await useFetch(`/api/eventCategories/${eventCategoryId}`, {
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
  