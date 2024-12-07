<template>
    <div>
        <Profile />
    </div>
</template>

<script setup>
useHead({
    title: 'My Profile'
})
definePageMeta({
    middleware: ['commonauth'],  // Apply the adminAuth middleware to this page
  });
</script>

<style scoped>
</style>