<template>
    <div>
        <div>
            <ul>
                <!-- Hardcoding the link for now; going to make it generic links population using v-for and props -->
                <li><NuxtLink to="/admin/userManagement">Manage Users</NuxtLink></li>
                <li><NuxtLink to="/admin/eventCategoryManagement">Manage Event Types</NuxtLink></li>

                <li><NuxtLink to="/eventOwner/eventManagement">Manage Events</NuxtLink></li>
                <li><NuxtLink to="/eventOwner/eventRegistrationManagemet">Manage Event Registration</NuxtLink></li>
            </ul>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
</style>