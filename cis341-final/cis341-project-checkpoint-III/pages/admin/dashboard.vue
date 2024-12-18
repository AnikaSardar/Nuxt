<template>
    <div>
        <h1>Dashboard</h1>
        <Dashboard />
    </div>
</template>

<script setup>
useHead({
    title: 'Dashboard'
})

definePageMeta({
    middleware: ['commonauth']
})
</script>

<style scoped>
</style>