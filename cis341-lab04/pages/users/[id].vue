<template>
    <div>
      <h2>User ID: {{ userId }}</h2>
      <p>User data: {{ userData }}</p>
      
      <button @click="handleClick">Delete user</button>

      <UserList></UserList>

    </div>
</template>
  
<script setup>
  /*
  Not necessary with latest version of Nuxt -- it will automatically import Vue modules.
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  */
  // Setup variables.
  const route = useRoute(); // Composable that returns current route.
  const userId = ref(route.params.id); //contains root id
  const { users } = useGetUsers(); // Composable that returns user list.
  const userData = ref(null);

  // Click handler for the button.
  const handleClick = () => {
    // useRemoveUser is automatically imported from ./composables.
    const success = useRemoveUser(userId.value);
    if(success) {
        // Force client to navigate to the specified path.
        navigateTo({ path: '/' })
    }
  };

  //its called after the component is mounted on the pg
  onMounted(() => {
    // Set userData to the current user.
    userData.value = users.value[userId.value];
});
</script>