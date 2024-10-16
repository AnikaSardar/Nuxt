<template>
    <div>
      <ul>
        <!-- Render a Vue list using v-for. For each of the user in users, get the user.id and user.name-->
        <li v-for="user in users" :key="user.id">
          <!-- Render NuxtLink component. -->
          <NuxtLink :to="`/users/${user.id}`">{{ user.name }}</NuxtLink>
        </li>
      </ul>
    </div>
</template>
  
<script setup>
   // Get user list from global state via useGetUsers,
  // which accesses useState().  
 const { users } = useGetUsers();
</script>
  
<style scoped>
</style>
  