<template>
    <div>
      <title>{{ title }}</title>
      <TopNavBar />
      <!-- AUTHENTICATION -->
      <div class="layout-container">
        <SideNavBar />
        <main class="main-content">
          <NuxtPage />
        </main>
      </div>
      
    </div>
  </template>

<script setup>
const title = useHead().title

const { isAuthenticated, getUserName } = useAuth(); // Use the authentication state

</script>

<style scoped>
@import url("~/assets/css/default-layout.css");
</style>