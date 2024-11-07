import axios from "axios";

// Create store
export const useUsersStore = defineStore("users", () => {
  const users = ref([]);
  const error = ref(null);

  // Actions that correspond to CRUD operations for getting users
  // adding a user, updating a user, and removing a user.
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:3333/users"); // using axios over fetch/useFetch (used for components); here not worried about caching
      users.value = data;
      error.value = null;
    } catch (err) {
      error.value = "Failed to fetch users. Please try again.";
    }
  };

  const addUser = async (user) => {
    try {
      user.id = generateId(user.email);
      const { data } = await axios.post("http://localhost:3333/users", user);
      users.value.push(data);
      error.value = null;
    } catch (err) {
      error.value = "Failed to add user. Please try again.";
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3333/users/${updatedUser.id}`,
        updatedUser
      );
      const index = users.value.findIndex((user) => user.id === data.id);
      if (index !== -1) {
        users.value[index] = data;
      }
      error.value = null;
    } catch (err) {
      error.value = "Failed to update user. Please try again.";
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3333/users/${userId}`);
      users.value = users.value.filter((user) => user.id !== userId);
      error.value = null;
    } catch (err) {
      error.value = "Failed to remove user. Please try again.";
    }
  };

  return {
    users,
    error,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
  };
});
