<template>
    <div>
        <p>Homepage</p>
        <!-- If user authenticated, add greetings -->
        <p v-if="isAuthenticated()">Hello {{ getUserName() }}! </p>
    </div>
</template>

<script setup>
useHead({
    title: 'Home'
})

const { isAuthenticated, getUserName } = useAuth(); // Use the authentication state
</script>

<style scoped>
</style>