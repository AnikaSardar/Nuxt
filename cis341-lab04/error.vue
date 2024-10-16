<!-- <template>
    <div class="mt-7 max-w-sm mx-auto text-center card">
        <p class="mt-7 text-7xl font-bold">{{ error.statusCode }}</p>
        <p class="mt-7 text-6xl">Ooops.</p>
        <p class="mt-7">{{ error.message}}</p>
        <button class="btn my-7" @click="handleClearError">Go Home...</button>
    </div>
</template>

<script setup>
    defineProps(['error']) // error obj

    const handleClearError = () => clearError({redirect: '/'})
</script>

<style scoped>

</style> -->


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

