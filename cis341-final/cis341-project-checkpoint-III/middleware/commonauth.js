export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, getRole } = useAuth();

 // allowed roles for common auth
  const allowedRoles = ["event_owner", "admin"]

  // If the user is not authenticated and admin
  if (!isAuthenticated() || !allowedRoles.includes(getRole())) {
    return navigateTo("/unauthorized");
  }
});
