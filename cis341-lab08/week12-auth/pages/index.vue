<template>
  <h1>Index</h1>
  <div>
    This is the home page.
  </div>
  <div v-if="response">
    {{ response.data }}
  </div>
  <div v-if="error">
    {{ error }}
  </div>
</template>

<script setup>
  const { data: response, error } = useFetch("/api/events");
</script>