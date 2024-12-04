export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // import the API layer for fetching data from the JSON server
    const { submitFeedback } = useApiLayer();
  
    try {
      return await submitFeedback(body);
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to submit feedback.',
        data: error,
      });
    }
  });
  