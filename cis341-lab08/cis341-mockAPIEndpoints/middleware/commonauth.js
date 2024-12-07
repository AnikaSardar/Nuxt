export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, getRole } = useAuth();

  console.log(getRole());

  const allowedRoles = ["event_owner", "admin"]

  console.log("Middleware execution");
  console.log("ela isauthenticatedL ", isAuthenticated());
  console.log("ela userrole: ", getRole());

  // If the user is not authenticated and admin
  if (!isAuthenticated() || !allowedRoles.includes(getRole())) {
    return navigateTo("/unauthorized");
  }
});
