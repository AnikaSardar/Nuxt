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

// useHead({
//   link: [
//     {
//       rel: 'stylesheet',
//       href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
//       integrity: 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH',
//       crossorigin: 'anonymous'
//     }
//   ]
// })
</script>

<style scoped>
@import url("~/assets/css/default-layout.css");
</style>