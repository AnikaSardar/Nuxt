export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated, getRole } = useAuth();
    
    // If the user is not authenticated and event_owner
    if (!isAuthenticated() || getRole() !== "event_owner") { 
      return navigateTo("/unauthorized");
    }
  });
  