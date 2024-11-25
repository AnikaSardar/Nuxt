export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { createRSVP } = useApiLayer();
  
    try {
      return await createRSVP(body);
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to RSVP.',
        data: error,
      });
    }
  });
  