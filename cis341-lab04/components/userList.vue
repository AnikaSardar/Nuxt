<template>
    <div>
      <ul>
        <!-- Render a Vue list using v-for. It's an obj that contains key,val pair-->
        <li v-for="(value, key) in users">
          <!-- Render NuxtLink component. -->
          <NuxtLink :to="`/users/${key}`">{{ value }}</NuxtLink>
        </li>
      </ul>
    </div>
</template>
  
<script setup>
  // Get user list from global state via useGetUsers,
  // which accesses useState().  
  // obj of users
  const { users } = useGetUsers();
</script>
  
<style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 5px 0;
  }
</style>
  