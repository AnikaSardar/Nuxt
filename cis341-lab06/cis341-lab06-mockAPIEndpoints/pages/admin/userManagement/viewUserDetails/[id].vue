<template>
  <div>

    <h1>View User Details</h1>
    <p>Name: {{ user.name }}</p>
    <p>Username: {{ user.username }}</p>
    <p>Id: {{ user.id }}</p>
    <p>Role: {{ user.role }}</p>

    <NuxtLink to="/admin/userManagement">Back to User List</NuxtLink>
  </div>

</template>

<script setup>

useHead({
  title: 'View User Details'
});

const route = useRoute();
const usersStore = useUsersStore();
const userId = route.params.id; 

onMounted(async () => {
  // Ensure the user list is loaded before accessing users
  await usersStore.fetchUsers();
});

const user = computed(() => usersStore.users.find((u) => u.id == userId));


if (!user.value) {
  throw createError({ message: 'User not found' , statusCode: 404})
}

</script>

<style scoped></style>
