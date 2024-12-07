<template>
    <div>
        <NuxtLink to="/admin/dashboard">Go back to Dashboard</NuxtLink>
        <UserList />
    </div>
</template>

<script setup>
useHead({
    title: 'User Management'
})

definePageMeta({
    middleware: ['admin-auth'],  // Apply the adminAuth middleware to this page
  });

</script>

<style scoped>
</style>