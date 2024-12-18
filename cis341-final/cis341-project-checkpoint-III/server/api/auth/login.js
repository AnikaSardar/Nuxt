
// event handler for login
export default defineEventHandler(async (event) => {
  const body = await readBody(event);


  try {
    // Fetch users from JSON Server
    const users = await $fetch("http://localhost:3333/events_registered_users");
    const events_roles = await $fetch("http://localhost:3333/events_roles");

    // Validate username and password
    const user = users.find(
      (u) => u.username === body.username && u.password === body.password
    );

    const eventRole = getEventRole(events_roles, user);

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

    // session update on role
    await session.update({ role: eventRole || "admin" });

    return {
      id: user.id,
      username: user.username,
      fullName: user.full_name,
      role: eventRole  || "user",
    };
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials!",
    });
  }
});

// return the event user role
function getEventRole(events_roles, user) {
  const role = events_roles.find(role => role.id === user.id);
  return role ? role.name.toLowerCase() : null; // Return the role name or null if not found
}
