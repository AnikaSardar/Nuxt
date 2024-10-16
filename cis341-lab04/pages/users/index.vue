<!-- <template>
    <div>
      <h1>Users List</h1>
      <UserList></UserList>
      
      <input type="text" v-model="users.name" placeholder="Name" required>
      <input type="number" v-model="users.age" placeholder="Age" required>
      <button @click="handleAddUser">Add User</button>

      <p><NuxtLink to="/">Back to Home</NuxtLink></p>
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
  const { addUser } = useAddUsers(); 
  
  const userAge = ref(null);
  
  
// user obj
const user = ref({
  id: null,
  name: '',
  age: null
})


// Click handler for the add button.
// const addNewUser = () => {
//   if (user.value.name && user.value.age) {

//     const usersList = users.value;
//     const usersListLastIndex = usersList.length - 1; // lastIndex = length - 1 

//     // check users array for length
//     if(usersList.length > 0)
//     {
//       lastUserId = usersList[usersListLastIndex].id; 
//       newUserId =  lastUserId++; // increment last userId by 1
//     }
//     else{
//       newUserId++; 
//     }
//     usersList.push({ id: newUserId, ...user.value })

//     // Reset newUser fields
//     user.value.name = ''
//     user.value.age = null
//   } else {
//     alert('Please fill out both fields')
//   }
// };
const newUser = ref({ name: '', age: null });
const handleAddUser = () => {
  if (newUser.value.name && newUser.value.age) {
    addUser({ ...newUser.value });
    newUser.value = { name: '', age: null }; // Reset the form after adding
  }
};
  //its called after the component is mounted on the pg
  onMounted(() => {
    // Set userData to the current user.
    userAge.value = users.value[userId.value];
  });

  </script> -->

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
  