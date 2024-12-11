<template>
    <div>
        <NuxtLink to="/admin/eventList">Go back to Event List</NuxtLink>
        <PastEventList />
    </div>
</template>

<script setup>
useHead({
    title: 'Past Event List'
})
</script>

<style scoped>

</style>