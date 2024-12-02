<template>
  <div class="container">
    <!-- Navigation -->
    <nav>
      <ul class="nav">
        <li class="nav-item">
          <NuxtLink class="nav-link" to="/">Home</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link" to="/admin">Admin Dashboard</NuxtLink>
        </li>
        <li class="nav-item" v-if="!isAuthenticated()">
          <NuxtLink class="nav-link" to="/login">Login</NuxtLink> <!-- Login link -->
        </li>
        <li class="nav-item" v-else>
          <div class="mt-1">Hello {{ getUserName() }}! <LogoutButton /></div> <!-- Logout button if authenticated -->
        </li>
      </ul>
    </nav>
    <!-- Main content of the page -->
    <slot />
  </div>
</template>
  
<script setup>
  const { isAuthenticated, getUserName } = useAuth(); // Use the authentication state

  useHead({
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
        integrity: 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH',
        crossorigin: 'anonymous'
      }
    ]
  })
</script>
