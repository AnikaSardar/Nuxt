// eventFeedback/[eventId].js
export default defineEventHandler(async (event) => {
    // Extract `eventId` parameter from the route

    // console.log(event.context.params.id); 
    // const {event_id} = getQuery(event);


    // Get the `event_id` parameter from the query
   

    //const { eventId } = event.context.params;
    const event_id = event.context.params.id;
  
    // Import the API layer for fetching data from the JSON server
    const { getEventFeedback } = useApiLayer();

    // Validate the `eventId` parameter
    if (!parseInt(event_id)) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid event ID.' });
    }

  
    try {
      // Call the utility layer to fetch the feedback for the specific event
      const e = await getEventFeedback(event_id); 
      console.log(`eventHandler for eventFeedback --> [id].js ---> geteventFeedback --> ${JSON.stringify(e)}`)

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
  

