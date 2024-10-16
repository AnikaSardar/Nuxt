<template>
    <div>
      <head>
        <title>{{ title }}</title>
      </head>
      <slot />
      <Footer/>
    </div>
</template>

<script setup>
// UseHead: https://nuxt.com/docs/api/composables/use-head
// Net Ninja: https://www.youtube.com/watch?v=MA76RDwfjH8 
const title = useHead().title
</script>

<style scoped>
</style>
