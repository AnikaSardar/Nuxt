<template>
  <div>
    <h1>View User Details</h1>
    <div v-if="user">
      <p>Name: {{ user.name }}</p>
      <p>Username: {{ user.username }}</p>
      <p>Id: {{ user.id }}</p>
      <p>Role: {{ user.role }}</p>
    </div>

    <p v-if="error">{{ error.message }}</p>
    <p v-if="pending">Loading...</p>

    <NuxtLink to="/admin/userManagement">Back to User List</NuxtLink>
  </div>

</template>

<script setup>

useHead({
  title: 'View User Details'
});

const { getUserDetails } = useApiService();
const route = useRoute();

const { user, error, pending } = await getUserDetails(route.params.id);

</script>

<style scoped></style>
