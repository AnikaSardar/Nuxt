<template>
    <div>
        <div>
            <ul>
                <!-- Hardcoding the link for now; going to make it generic links population using v-for and props -->
                <li v-if="isAdmin"><NuxtLink to="/admin/userManagement">Manage Users</NuxtLink></li>
                <li v-if="isAdmin"><NuxtLink to="/admin/eventCategoryManagement">Manage Event Types</NuxtLink></li>
                <li><NuxtLink to="/admin/eventList">Manage Events</NuxtLink></li>
                <li><NuxtLink to="/admin/eventRegistrationManagement">Manage Event Registration</NuxtLink></li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {useAuth } from "~/utils/auth.js"; // Adjust the path to where `useAuth` is defined
const { isAuthenticated, getUserName } = useAuth();

// Reactive variable to hold the user's role
const userRole = ref(null);

// Import the `getRole` function
const { getRole } = useAuth();

// Computed property to check if the user is an admin
const isAdmin = computed(() => userRole.value === "admin");

// Retrieve the user role when the component is mounted
onMounted(() => {
  userRole.value = getRole(); // Fetch the role dynamically
});
</script>

<style scoped>
</style>