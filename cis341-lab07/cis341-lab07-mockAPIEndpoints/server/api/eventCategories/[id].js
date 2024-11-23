export default defineEventHandler(async (event) => {
    // extract the `id` parameter from the route
    const { id } = event.context.params;
  
    // import the API layer for fetching data from the JSON server
    const { getEventCategoryDetails } = useApiLayer();
  
    // validate the `id` parameter
    if (!parseInt(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid event type ID.',
      });
    }
  
    try {
      // call the utility layer to fetch the specific user details
      return await getEventCategoryDetails(id);
    } catch (error) {
      // handle errors 
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to fetch event type with ID ${id}.`,
        data: error,
      });
    }
  });
