export default defineEventHandler(async (event) => {
    // Import the API layer for fetching data from the JSON server
    const { getRegisteredUserRoles } = useApiLayer();
  
    try {
      // Call the utility layer to fetch the data
      return await getRegisteredUserRoles();
    } catch (error) {
      // Handle errors
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch user roles.',
        data: error,
      });
    }
  });
  