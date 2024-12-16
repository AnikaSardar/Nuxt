
export default defineEventHandler(async (event) => {
  // import the API layer for fetching data from the JSON server
  const { getUsers } = useApiLayer();

  try {
    // call the utility layer to fetch the data
    return await getUsers();
  } catch (error) {
    // handle errors 
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch users.',
      data: error,
    });
  }
});


