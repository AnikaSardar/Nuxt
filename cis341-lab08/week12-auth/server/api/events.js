import authorizeRoute from "~/server/authorizeRoute.js";

export default defineEventHandler(async (event) => {
  // Only allow admins to access this route.
  await authorizeRoute(event, "admin");
  return { data: "Success!" };
});
