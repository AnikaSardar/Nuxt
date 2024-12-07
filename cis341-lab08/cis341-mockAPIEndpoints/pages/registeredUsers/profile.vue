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
    middleware: ['registereduserauth']
})
</script>

<style scoped>
</style>