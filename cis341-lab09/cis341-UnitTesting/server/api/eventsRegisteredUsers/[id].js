export default defineEventHandler(async (event) => {
    // Extract `id` parameter from the route
    const { id } = event.context.params;
  
    // Import the API layer for fetching data from the JSON server
    const { getRegisteredUserDetails } = useApiLayer();
  
    // Validate the `id` parameter
    if (!parseInt(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid user ID.',
      });
    }
  
    try {
      // Call the utility layer to fetch the specific user details
      return await getRegisteredUserDetails(id);
    } catch (error) {
      // Handle errors
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to fetch registered user with ID ${id}.`,
        data: error,
      });
    }
  });
  