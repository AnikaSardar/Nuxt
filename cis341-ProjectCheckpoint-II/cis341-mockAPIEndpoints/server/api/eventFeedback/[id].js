export default defineEventHandler(async (event) => {

    // Get the `event_id` parameter from params
  const event_id = event.context.params.id;
  
    // Import the API layer for fetching data from the JSON server
    const { getEventFeedback } = useApiLayer();

    // Validate the `eventId` parameter
    if (!parseInt(event_id)) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid event ID.' });
    }
  
    try {
      return await getEventFeedback(event_id);
    } catch (error) {
      // Handle errors
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to fetch feedback for event with ID ${event_id}.`,
        data: error,
      });
    }
  });
  

