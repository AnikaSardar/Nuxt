export default defineEventHandler(async (event) => {
    // import the API layer for fetching data from the JSON server
    const { getEventCategories } = useApiLayer();
  
    try {
      // call the utility layer to fetch the data
      return await getEventCategories();
    } catch (error) {
      // handle errors 
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch event types.',
        data: error,
      });
    }
  });
  
  
  