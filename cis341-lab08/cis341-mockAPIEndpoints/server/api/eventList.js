export default defineEventHandler(async (event) => {
    const { getEvents } = useApiLayer();
    try {
      await authorizeRoute(event, "admin");
      return await getEvents();
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch events.',
        data: error,
      });
    }
  });
  