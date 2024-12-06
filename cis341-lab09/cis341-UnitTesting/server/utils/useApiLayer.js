export const useApiLayer = () => {
  const baseUrl = 'http://localhost:3333';

   // Define a reactive reference to store the list of events.
  const eventList = ref([]);

    // fetch the list of events
  const getEvents = async () => {
    try {
      const events = await $fetch(`${baseUrl}/events`); // Fetch all events from JSON Server
      eventList.value = events;
      return events; // Return raw event data
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch events from JSON Server.',
        data: error,
      });
    }
  };

  // fetch details of a specific event
  const getEventDetails = async (id) => {
    try {
      // Fetch event details
      const event = await $fetch(`${baseUrl}/events/${id}`);
      // Fetch related data
      const eventType = await $fetch(`${baseUrl}/events_types/${event.type_id}`);
      const eventOwner = await $fetch(`${baseUrl}/events_registered_users/${event.owner_id}`);
      // Add related data to the event object
      return { ...event, eventType, eventOwner };
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to fetch event with ID ${id} from JSON Server.`,
        data: error,
      });
    }
  };

    return {  
      getEvents, getEventDetails, eventList,
    };
  };
