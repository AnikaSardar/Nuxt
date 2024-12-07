<template>
    <div>
        <NuxtLink to="/admin/dashboard">Go back to Dashboard</NuxtLink>
        <EventRegistrationList />
    </div>
</template>

<script setup>
useHead({
    title: 'Event Registration Management'
})

definePageMeta({
    middleware: ['admin-auth'],  // Apply the adminAuth middleware to this page
  });
</script>

<style scoped>
</style>