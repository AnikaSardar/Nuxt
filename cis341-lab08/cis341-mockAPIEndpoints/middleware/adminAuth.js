export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, getRole } = useAuth();

  // If the user is not authenticated and admin
  if (!isAuthenticated() || getRole() !== "admin") {
    return navigateTo("/unauthorized");
  }
});
