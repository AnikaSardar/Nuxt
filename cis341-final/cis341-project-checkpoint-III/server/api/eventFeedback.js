// eventFeedback event handler
export default defineEventHandler(async () => {
      // import the API layer for fetching data from the JSON server
    const { getEventFeedback } = useApiLayer();
    try {
    // call the utility later
      return await getEventFeedback();
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch event feedback.',
        data: error,
      });
    }
  });
  