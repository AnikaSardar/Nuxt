<<<<<<< Updated upstream
// eventFeedback.js
=======
// eventFeedback event handler
>>>>>>> Stashed changes
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
  