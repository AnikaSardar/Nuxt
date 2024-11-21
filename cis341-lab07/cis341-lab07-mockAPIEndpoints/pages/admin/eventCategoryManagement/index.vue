<template>
    <div>
        <NuxtLink to="/admin/dashboard">Go back to Dashboard</NuxtLink>
        <EventCategoryList />
    </div>
</template>

<script setup>
useHead({
    title: 'Event Management'
})
</script>

<style scoped>

</style>