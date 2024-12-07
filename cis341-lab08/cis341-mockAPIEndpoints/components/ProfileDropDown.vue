<template>
    <div class="dropdown">
        <button class="dropbtn">[Profile-icon dropdown]</button>
        <div class="dropdown-content">
            <NuxtLink v-if="isAuthenticated()" to="/admin/profile">My Profile</NuxtLink>
            <NuxtLink v-if="isAdmin"  to="/admin/dashboard">Dashboard</NuxtLink>
            <NuxtLink v-if="isAuthenticated()" to="/settings">Settings</NuxtLink>
            <!-- Dynamically change text for login/logout -->
            <NuxtLink v-if="isAuthenticated()" to="/login">Sign out</NuxtLink>
            <NuxtLink v-else to="/login">Login</NuxtLink>
        </div>
    </div>

</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuth } from "~/utils/auth.js"; // Adjust the path to where `useAuth` is defined

// Reactive variable to hold the user's role
const userRole = ref(null);

// Import the `getRole`, isAuthenticated functions
const { isAuthenticated, getRole } = useAuth();

// Computed property to check if the user is an admin
const isAdmin = computed(() => userRole.value === "admin");

// Retrieve the user role when the component is mounted
onMounted(() => {
  userRole.value = getRole(); // Fetch the role dynamically
});
</script>

<style scoped>
@import url("~/assets/css/profile-dropdown.css");
</style>