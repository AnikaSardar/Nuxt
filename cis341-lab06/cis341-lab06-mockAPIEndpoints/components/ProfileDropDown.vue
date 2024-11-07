<template>
    <div class="dropdown">
        <button class="dropbtn">[Profile-icon dropdown]</button>
        <div class="dropdown-content">
            <NuxtLink to="/admin/profile">My Profile</NuxtLink>
            <NuxtLink to="/admin/dashboard">Dashboard</NuxtLink>
            <NuxtLink to="/settings">Settings</NuxtLink>
            <NuxtLink to="/login">Sign out</NuxtLink>
        </div>
    </div>

</template>

<script setup>
</script>

<style scoped>
@import url('~/assets/css/profile-dropdown.css');
</style>