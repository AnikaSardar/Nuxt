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
