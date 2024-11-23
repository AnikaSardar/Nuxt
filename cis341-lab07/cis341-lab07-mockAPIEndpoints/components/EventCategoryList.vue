<template>
    <div>
        <h1>Event Category List</h1>
        <p v-if="status === 'pending'">Loading...</p>
        <ul v-else>
            <li v-for="eventCategory in eventCategories.eventCategories" :key="eventCategory.id">
                <NuxtLink :to="`/admin/eventCategoryManagement/viewEventCategoryDetails/${eventCategory.id}`"> Name: {{
                    eventCategory.name }} | Id: {{ eventCategory.id }} |</NuxtLink>
            </li>
        </ul>
        <p v-if="error">{{ error.statusMessage }}</p>
    </div>

</template>

<script setup>

const nuxt = useNuxtApp();
const CACHE_KEY = 'eventCategories';
const CACHE_TTL = 10 * 1000; // 10 seconds

// Check cache and refetch if needed
const { data: eventCategories, error, status } = await useFetch('/api/eventCategories', {
  key: CACHE_KEY,
  transform(input) {
    // Directly return the list of event categories with additional metadata
    return {
      eventCategories: input, // Raw API data
      fetchedAt: new Date(), // Metadata for caching
    };
  },
  getCachedData: (key) => {
    // Retrieve cached data from Nuxt's payload or static data
    const data = nuxt.payload.data[key] || nuxt.static.data[key];
    if (!data) return null;

    // Check expiration
    const expirationDate = new Date(data.fetchedAt);
    expirationDate.setTime(expirationDate.getTime() + CACHE_TTL);
    const isExpired = expirationDate.getTime() < Date.now();

    if (isExpired) {
      return null; // Force refetch if cache expired
    }

    // Return valid cached data
    return data;
  },
});


</script>

<style scoped>
@import url("~/assets/css/form.css");
</style>
