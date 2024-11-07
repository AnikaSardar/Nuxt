<!-- <template>
    <div>

         <p>User List</p>
    </div>
</template>

<script setup>

</script>

<style scoped></style> -->

<template>
    <div>
      <h1>User List</h1>
      <form @submit.prevent="createUser">
        <div>
            <input v-model="newUser.name" placeholder="Name" required />
        </div>
        <div>
            <input v-model="newUser.username" placeholder="Username" required />
        </div>
        <div>
            <input v-model="newUser.role" placeholder="Role" required />
        </div>
        <button type="submit">Add/Edit User</button>
      </form>

    <div v-if="usersStore.error" class="error-message">
        <p>{{ usersStore.error }}</p>
    </div>

      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }} - {{ user.role }}
          <button @click="removeUser(user.id)">Delete</button>
          <button @click="editUser(user)">Edit</button>
        </li>
      </ul>
    </div>

</template>
  
<script setup>  
    const usersStore = useUsersStore();
    const newUser = ref({
        name: '',
        username: '',
        role: ''
    });
    const users = ref(null);
    const modified = ref(false);
    
    onMounted(async () => {
        // Get users from store --> will trigger a fetch from external API.
        await usersStore.fetchUsers();
        users.value = usersStore.users;
    });
    
    // Event handlers -- call appropriate action from Pinia store.
    const createUser = async () => {
        if(modified.value) {
            await usersStore.updateUser({ ...newUser.value});
            modified.value = !modified.value;
        } else {
            await usersStore.addUser({ ...newUser.value });
        }
        newUser.value.name = '';
        newUser.value.username = '';
        newUser.value.role = '';
    };
    
    const removeUser = async (userId) => {
        await usersStore.deleteUser(userId);
        // For some reason the users ref does not pick up the changes
        // to the store so we're forcing the assignment here.
        users.value = usersStore.users; 
    };
    
    const editUser = (user) => {
        newUser.value = { ...user };
        modified.value = true;
    };
</script>
  
<style scoped>
    div {
        margin-bottom: 10px;
    }
    .error-message {
        color: red;
        margin-bottom: 1rem;
    }
</style>
