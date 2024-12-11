// eventFeedback event handler
export default defineEventHandler(async () => {
    const { getEventFeedback } = useApiLayer();
    try {
      return await getEventFeedback();
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch event feedback.',
        data: error,
      });
    }
  });
  