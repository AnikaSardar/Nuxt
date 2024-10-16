  <template>
    <div>
      <h1>Users List</h1>
      <UserList />

      <input type="text" v-model="newUser.name" placeholder="Name" required />
      <input type="number" v-model="newUser.age" placeholder="Age" required />
      <button @click="handleAddUser">Add User</button>
  
      <p><NuxtLink to="/">Back to Home</NuxtLink></p>
    </div>
  </template>
  
  <script setup>
  useHead({ title: 'Users' });
  
  // composables for getting and adding users
  const { users } = useGetUsers();  
  const { addUser } = useAddUsers();  
  
  // new user obj
  const newUser = ref({ name: '', age: null });
  
  const handleAddUser = () => {
    if (newUser.value.name && newUser.value.age) {
      // add users 
      addUser(newUser.value);

      // reset the fields
      newUser.value = { name: '', age: null }; 
    } 
    else {
      alert("Please fill out both fields.");
    }
  };
  </script>
  