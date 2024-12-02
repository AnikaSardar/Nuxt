export default async (event, role) => {
  const runtimeConfig = useRuntimeConfig();
  const authCookie = getCookie(event, runtimeConfig.authCookieName);

  if (authCookie) {
    // Retrieve session with cookie info from request ('event').
    const session = await useSession(event, {
      name: runtimeConfig.authCookieName,
      password: runtimeConfig.sessionPassword,
    });

    if (session.data.role === role) {
      return true;
    } else {
      throw createError({
        statusCode: 401,
        statusMessage: "Not authorized to access endpoint!",
      });
    }
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: "Not authenticated!",
    });
  }
};
