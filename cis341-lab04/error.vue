<template>
    <div>
        <h1>{{errorMessage.headerMsg}}</h1>
        <p>{{errorMessage.paragraphMsg}}</p>
        <p><NuxtLink to="/">Back to Home</NuxtLink></p>
    </div>
</template>

<script setup>
    const props = defineProps(['error']) // error obj
    const errorMessage = computed(() => {
        
  if (props.error.statusCode === 404) {
    return {
      headerMsg: "Not Found!!!",
      paragraphMsg: "The resource you were looking for was not found!"
    };
  } else if (props.error.statusCode === 500) {
    return {
      headerMsg: props.error.message,
    };
  } 
});


</script>

<style scoped>

</style>

