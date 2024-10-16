<!-- <template>
  <div>
    <h2>User: {{  }}</h2>
    <p>Age: {{ userAge }}</p>
    
    <p><NuxtLink to="/users">Back to user list</NuxtLink></p>
    <footer>Anika Sardar</footer>
  </div>
</template>

<script setup>
useHead({
    title: 'Users'
})

/*
Not necessary with latest version of Nuxt -- it will automatically import Vue modules.
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
*/
// Setup variables.
const route = useRoute(); // Composable that returns current route.
const userId = ref(route.params.id); //contains root id
const { users } = useGetUsers(); // Composable that returns user list.
const userAge = ref(null);

//its called after the component is mounted on the pg
onMounted(() => {
  // Set userData to the current user.
  userAge.value = users.value[userId.value];
});
</script> -->


<template>
  <div>
    <h1>User: {{ user.name }}</h1>
    <p>Age: {{ user.age }}</p>

    <p>
      <NuxtLink to="/users">Back to user list</NuxtLink>
    </p>

  </div>
</template>

<script setup>
useHead({
  title: 'User Details'
});

const route = useRoute();
const userId = ref(parseInt(route.params.id));
const { users } = useGetUsers();
// const userData = ref(null); 

// Reference: https://v1.test-utils.vuejs.org/api/wrapper/find.html 
// returns the first single user that satisfies the condition 
const user = computed(() => users.value.find(currUser => currUser.id == userId.value));

// onMounted(() => {
//   if (!user.value) {
//     alert("User not found!");
//   }
// });

// onMounted(() => {
//   userData.value = users.value[userId]; // Access user directly using userId
//   if (!userData.value) {
//     throw createError({ message: 'User not found'})
//   }
// });

if (!user.value) {
  throw createError({ message: 'User not found' })
}
</script>

<style scoped>
</style>