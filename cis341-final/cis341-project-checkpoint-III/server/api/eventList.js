export default defineEventHandler(async () => {
    const { getEvents } = useApiLayer();
    try {
      return await getEvents();
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch events.',
        data: error,
      });
    }
  });
  