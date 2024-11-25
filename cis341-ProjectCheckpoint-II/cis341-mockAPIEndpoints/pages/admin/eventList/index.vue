<template>
    <div>
        <NuxtLink to="/admin/dashboard">Go back to Dashboard</NuxtLink>
        <EventList />
    </div>
</template>

<script setup>
useHead({
    title: 'Event List'
})
</script>

<style scoped>

</style>