export const useAuth = () => {
  const token = useState("token", () => null); // Token state to store auth token

  // Login function
  const login = async (username, password) => {
    try {
      // Make request to server route for login
      const response = await $fetch("/api/auth/login", {
        method: "POST",
        body: {
          username: username,
          password: password,
        },
      });
      if (response) {
        token.value = response; // Store the token in the state
        return true;
      }
    } catch (error) {
      throw new Error("Invalid credentials!");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Make request to server route for logout
      const response = await $fetch("/api/auth/logout", {
        method: "GET",
      });
      if (response.success) {
        token.value = null; // Remove token from state
        return true;
      }
    } catch (error) {
      throw new Error("Logout failed!");
    }
  };

  // Check if the user is authenticated, i.e., is the auth token
  // set in shared global state.
  const isAuthenticated = () => {
    return token.value ? true : false;
  };

  const getUserName = () => {
    return token.value
      ? `${token.value.firstName} ${token.value.lastName}`
      : "anonymous";
  };

  const getRole = () => {
    return token.value ? token.value.role : "none";
  };

  return { login, logout, isAuthenticated, getUserName, getRole };
};
