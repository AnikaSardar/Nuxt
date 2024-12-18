import authorizeRoute from "~/server/api/authorizeRoute.js";

export default defineEventHandler(async (event) => {
      // import the API layer for fetching data from the JSON server
    const { getEvents } = useApiLayer();
    try {
      await authorizeRoute(event, ["admin", "event_owner", "registered_user"]); // only allow admins, event owners, registered users to access this route
      return await getEvents();
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch events.',
        data: error,
      });
    }
  });
  