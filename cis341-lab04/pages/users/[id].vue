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

// Reference: https://v1.test-utils.vuejs.org/api/wrapper/find.html 
// returns the first single user that satisfies the condition 
const user = computed(() => users.value.find(currUser => currUser.id == userId.value));


if (!user.value) {
  throw createError({ message: 'User not found' })
}
</script>

<style scoped></style>