<template>
    <div>
      <title>{{ title }}</title>
      <TopNavBar />
      
      <div class="layout-container">
        <SideNavBar />
        <main class="main-content">
          <NuxtPage />
        </main>
      </div>
      
    </div>
  </template>

<script setup>
const title = useHead().title
</script>

<style scoped>
@import url("~/assets/css/default-layout.css");
</style>