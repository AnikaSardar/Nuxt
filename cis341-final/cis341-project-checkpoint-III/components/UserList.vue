<template>
  <div>
      <div>
          <h1>User List</h1>
          <p v-if="status === 'pending'">Loading...</p>
          <div v-else>
            <button @click="createUser" style="margin-bottom: 20px;">Create New User</button>
              <ul>
                  <li v-for="user in users" :key="user.id" >
                      <NuxtLink :to="`/admin/userManagement/viewUserDetails/${user.id}`"> Name: {{ user?.full_name }} |
                          Username: {{
                              user?.username }} | Id: {{ user?.id }} | Role: {{ user?.role_id}} |</NuxtLink>
                              <button @click="editUser(user.id)">Edit</button>
                              <button @click="deleteUserById(user.id)">Delete</button>
                  </li>

              </ul>
          </div>
          <p v-if="error">{{ error.statusMessage }}</p>
      </div>
  </div>

</template>
<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { z } from 'zod'; // Import zod for validation

// Define the Zod schema for user validation
const userSchema = z.object({
  id: z.number(),
  full_name: z.string().min(1, "Full name is required"),
  username: z.string().min(1, "Username is required"),
  role_id: z.number().min(1, "Role ID must be a valid number"),
});

const usersSchema = z.array(userSchema);

const router = useRouter();
const { deleteRegisteredUser, getRegisteredUsers } = useApiService();

const users = ref([]);
const error = ref(null);
const status = ref('pending');

try {
  const response = await getRegisteredUsers();

  // Validate response using Zod schema
  const validUsers = usersSchema.parse(response.users?.value);

  users.value = validUsers; // Assign validated data
  status.value = 'success';
} catch (err) {
  if (err instanceof z.ZodError) {
    console.error('Validation Error:', err.errors);
    error.value = { statusMessage: 'Data validation failed. Please contact support.' };
  } else {
    console.error('Error fetching users:', err);
    error.value = err;
  }
  status.value = 'error';
}

// Navigate to the edit page when the Edit button is clicked
const editUser = (userId) => {
  console.log(`Editing user with ID: ${userId}`);
  router.push(`/admin/userManagement/editUserDetails/${userId}`);
};

// Navigate to the create page when the Create button is clicked
const createUser = () => {
  console.log("Navigating to create user page");
  router.push(`/admin/userManagement/createUserDetails`);
};

// Delete a user by ID
const deleteUserById = async (userId) => {
  if (!confirm(`Are you sure you want to delete the user with ID ${userId}?`)) {
    return;
  }

  try {
    await deleteRegisteredUser(userId); // Call the API to delete the user
    alert('User deleted successfully!');
    window.location.reload();
  } catch (err) {
    console.error('Error deleting user:', err);
    alert('Failed to delete user. Please try again.');
  }
};
</script>


<style scoped>
@import url("~/assets/css/form.css");
</style>
