<template>
    <div>
        <NuxtLink to="/admin/eventList">Go back to Event List</NuxtLink>
        <PastEventList />
    </div>
</template>

<script setup>
useHead({
    title: 'Past Event List'
})
definePageMeta({
    middleware: ['admin-auth'],  // Apply the adminAuth middleware to this page
  });

</script>

<style scoped>

</style>