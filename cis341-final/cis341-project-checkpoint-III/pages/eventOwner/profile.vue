<template>
    <div>
        <Profile />
    </div>
</template>

<script setup>
useHead({
    title: 'My Profile'
})

definePageMeta({
    middleware: ['commonauth']
})
</script>

<style scoped>
</style>