<template>
    <button class="btn btn-primary btn-sm" @click="handleLogout">Logout</button>
  </template>
  
  <script setup>
  const { logout } = useAuth();
  
  // Handle logout
  const handleLogout = async () => {
    const success = await logout();  // Log the user out by clearing the token
    if(success) await navigateTo("/");  // Redirect to the login page
  };
  </script>
  