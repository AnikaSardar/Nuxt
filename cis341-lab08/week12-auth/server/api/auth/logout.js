export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();

  const authCookie = getCookie(event, runtimeConfig.authCookieName);

  if (authCookie) {
    // Retrieve session with cookie info from request ('event').
    const session = await useSession(event, {
      name: runtimeConfig.authCookieName,
      password: runtimeConfig.sessionPassword,
    });
    // Clear session
    await session.clear();
    return { success: true };
  } else {
    return { success: false };
  }
});
