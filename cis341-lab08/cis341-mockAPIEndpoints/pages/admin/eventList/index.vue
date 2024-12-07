<template>
    <div>
        <NuxtLink to="/admin/dashboard">Go back to Dashboard</NuxtLink>
        <ul>
            <li><NuxtLink to="/admin/eventList/pastEvents">View Past Event List</NuxtLink></li>
            <li><NuxtLink to="/admin/eventList/newEvents">View New Event List</NuxtLink></li>
        </ul>
    </div>
</template>

<script setup>
useHead({
    title: 'Event List'
})
</script>

<style scoped>

</style>