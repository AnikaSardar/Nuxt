<template>
    <div>
        <NuxtLink to="/admin/dashboard">Go back to Dashboard</NuxtLink>
        <UserList />
    </div>
</template>

<script setup>
useHead({
    title: 'User Management'
})

</script>

<style scoped>
</style>