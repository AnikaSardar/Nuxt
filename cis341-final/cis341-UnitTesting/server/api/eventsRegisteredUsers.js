export default defineEventHandler(async (event) => {
    // Import the API layer for fetching data from the JSON server
    const { getRegisteredUsers } = useApiLayer();
  
    try {
      // Call the utility layer to fetch the data
      return await getRegisteredUsers();
    } catch (error) {
      // Handle errors
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch registered users.',
        data: error,
      });
    }
  });
  