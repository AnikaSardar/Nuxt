<template>
    <div>
        <NuxtLink to="/admin/eventList">Go back to Event List</NuxtLink>
        <NewEventList />
    </div>
</template>

<script setup>
useHead({
    title: 'New Events'
})

definePageMeta({
    middleware: ['admin-auth'],  // Apply the adminAuth middleware to this page
  });
</script>

<style scoped>

</style>