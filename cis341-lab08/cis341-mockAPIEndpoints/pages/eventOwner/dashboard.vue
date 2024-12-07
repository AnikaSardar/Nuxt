<template>
    <div>
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