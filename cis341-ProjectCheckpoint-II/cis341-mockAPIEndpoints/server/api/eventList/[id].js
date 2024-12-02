
// export default defineEventHandler(async (event) => {
//      // extract `id` parameter from the route
//     const { id } = event.context.params;

//      // import the API layer for fetching data from the JSON server
//     const { getEventDetails } = useApiLayer();

//     // Validate the `id` parameter
//     if (!parseInt(id)) {
//       throw createError({ statusCode: 400, statusMessage: 'Invalid event ID.' });
//     }
  
//     try {
//        // call the utility layer to fetch the specific event details
//       return await getEventDetails(id);
//     } catch (error) {
//       // handle errors 
//       throw createError({
//         statusCode: 500,
//         statusMessage: `Failed to fetch event with ID ${id}.`,
//         data: error,
//       });
//     }
//   });
export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const { getEventDetails } = useApiLayer();

  if (!parseInt(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid event ID.' });
  }
  const e = await getEventDetails(id);
  console.log(`TRY ${JSON.stringify(e)}`);
  try {

    return await getEventDetails(id);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch event with ID ${id}.`,
      data: error,
    });
  }
});
