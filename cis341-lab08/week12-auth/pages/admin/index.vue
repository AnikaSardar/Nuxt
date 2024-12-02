<template>
  <h1>Dashboard</h1>
</template>

<script setup>
  definePageMeta({
    middleware: ['admin-auth'],  // Apply the adminAuth middleware to this page
  });
</script>
