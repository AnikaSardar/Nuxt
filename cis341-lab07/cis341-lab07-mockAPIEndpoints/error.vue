<template>
    <div>
        <h1>{{errorMessage.headerMsg}}</h1>
        <p>{{errorMessage.paragraphMsg}}</p>
        <p><NuxtLink to="/">Back to Home</NuxtLink></p>
    </div>
</template>

<script setup>
    const props = defineProps (['error']) // error obj
    const errorMessage = computed(() => {
        
  if (props.error.statusCode === 404) {
    return {
      headerMsg: "Page not Found!!!",
      paragraphMsg: "The page you were looking for was not found! Please ensure you have the correct url."
    };
  } else {
    return {
      statusCode: props.error.statusCode,
      headerMsg: "We are facing some technical difficulties. Please try again later."
    };
  } 
});


</script>

<style scoped>

</style>

