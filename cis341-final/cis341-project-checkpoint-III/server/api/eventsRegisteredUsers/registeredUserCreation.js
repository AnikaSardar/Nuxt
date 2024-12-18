export default defineEventHandler(async (event) => {
    // Extract `id` parameter from the route (if applicable)
    const { id } = event.context.params || {};

    // Import the API layer
    const { 
      getRegisteredUserDetails,  
      updateRegisteredUser, 
      createRegisteredUser,
      deleteRegisteredUser 
    } = useApiLayer();
  
    // Validate the `id` parameter for methods that require it
    if (['GET', 'PUT', 'DELETE'].includes(event.node.req.method) && (!id || !parseInt(id))) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid or missing user ID.',
      });
    }
  
    try {
      switch (event.node.req.method) {
        case 'GET': {
          // Fetch user details
          console.log("Inside GET of server:")
          return await getRegisteredUserDetails(id);
        }
        case 'POST': {
          // Parse the request body for creating a new user
          console.log("Inside POST of server:")
          const body = await readBody(event);
          if (!body) {
            throw createError({
              statusCode: 400,
              statusMessage: 'Request body is required.',
            });
          }
          return await createRegisteredUser(body);
        }
        case 'PUT': {
          // Parse the request body for updating user details
          console.log("Inside PUT of server:")
          const body = await readBody(event);
          if (!body) {
            throw createError({
              statusCode: 400,
              statusMessage: 'Request body is required.',
            });
          }
          return await updateRegisteredUser(id, body);
        }
        case 'DELETE': {
          console.log("Inside DELETE of server:")
          // Handle user deletion
          return await deleteRegisteredUser(id);
        }
        default: {
          // Handle unsupported methods
          console.log("Inside UNSUP of server:")
          throw createError({
            statusCode: 405,
            statusMessage: `Method ${event.node.req.method} not allowed.`,
          });
        }
      }
    } catch (error) {
      // General error handling
      throw createError({
        statusCode: 500,
        statusMessage: `An error occurred while processing the request.`,
        data: error,
      });
    }
  });
  