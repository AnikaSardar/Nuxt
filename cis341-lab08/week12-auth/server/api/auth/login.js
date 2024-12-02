export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const body = await readBody(event);

  try {
    // This would be a good place to validate!
    const loginBody = JSON.stringify({
      username: body.username,
      password: body.password,
    });

    // Send request to auth provider.
    // We're using DummyJSON but you could just as well check against the JSON Server endpoints...
    const response = await $fetch(`${runtimeConfig.loginBaseUrl}/login`, {
      method: "POST",
      body: loginBody,
    });

    // Create new session. Cookie attributes default to true for HttpOnly and Secure.
    const session = await useSession(event, {
      name: runtimeConfig.authCookieName,
      password: runtimeConfig.sessionPassword,
      cookie: {
        httpOnly: true,
        secure: true,
      },
    });

    // Update session with auth information.
    // This is where you'd populate the role based on the response
    // returned from the auth provider.
    await session.update({
      role: "user",
    });

    // Return response to frontend.
    return {
      user: response.username,
      firstName: response.firstName,
      lastName: response.lastName,
      role: "user",
    };
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Unable to login.",
    });
  }
});
