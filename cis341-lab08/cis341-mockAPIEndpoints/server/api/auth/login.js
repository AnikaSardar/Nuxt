// export default defineEventHandler(async (event) => {
//   const runtimeConfig = useRuntimeConfig();
//   const body = await readBody(event);
//   console.log(`runtimeConfig ${JSON.stringify(runtimeConfig)}`)
//   console.log(`loginBaseUrl: ${runtimeConfig.loginBaseUrl}`);

//   try {
//     // This would be a good place to validate!
//     const loginBody = JSON.stringify({
//       username: body.username,
//       password: body.password,
//     });
//     console.log(`login.js ---> loginBody ${JSON.stringify(loginBody)}`)
//     // Send request to auth provider.
//     // We're using DummyJSON but you could just as well check against the JSON Server endpoints...
//     const response = await $fetch(`${runtimeConfig.loginBaseUrl}`, {
//       method: "POST",
//       body: loginBody,
//     });
//     console.log(`login.js ---> response ${JSON.stringify(response)}`)

//     // Create new session. Cookie attributes default to true for HttpOnly and Secure.
//     const session = await useSession(event, {
//       name: runtimeConfig.authCookieName,
//       password: runtimeConfig.sessionPassword,
//       cookie: {
//         httpOnly: true,
//         secure: true,
//       },
//     });

//     // Update session with auth information.
//     // This is where you'd populate the role based on the response
//     // returned from the auth provider.
//     await session.update({
//       role: "admin",
//     });

//     // Return response to frontend.
//     return {
//       user: response.username,
//       firstName: response.firstName,
//       lastName: response.lastName,
//       role: "abcde",
//     };
//   } catch (error) {
//     throw createError({
//       statusCode: 400,
//       statusMessage: "Unable to login.",
//     });
//   }
// });
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(`login.js ---> Received body: ${JSON.stringify(body)}`);

  try {
    // Fetch users from JSON Server
    const users = await $fetch("http://localhost:3333/events_registered_users");

    // Validate username and password
    const user = users.find(
      (u) => u.username === body.username && u.password === body.password
    );

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid credentials!",
      });
    }

    // Create session and return user info
    const session = await useSession(event, {
      name: "auth-session",
      password: "G4tE8dL9aM5oN2yT6pR8qA9jI#8dL4bG7n8sK5aL2hJ$eK4M8cB9dY6FpQ",
      cookie: {
        httpOnly: true,
        secure: true,
      },
    });

    await session.update({ role: user.role || "user" });

    return {
      id: user.id,
      username: user.username,
      fullName: user.full_name,
      role: user.role || "user",
    };
  } catch (error) {
    console.error(`login.js ---> Error: ${error.message}`);
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials!",
    });
  }
});
