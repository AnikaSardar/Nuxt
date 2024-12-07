import authorizeRoute from "~/server/api/authorizeRoute.js";

export default defineEventHandler(async (event) => {
    const { getEvents } = useApiLayer();
    try {
      await authorizeRoute(event, "admin"); // omly allow admins to access this route
      return await getEvents();
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch events.',
        data: error,
      });
    }
  });
  