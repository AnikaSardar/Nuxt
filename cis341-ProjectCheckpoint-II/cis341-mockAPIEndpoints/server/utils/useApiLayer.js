export const useApiLayer = () => {
    const baseUrl = 'http://localhost:3333';
  
    // fetch the list of users
    const getUsers = async () => {
      try {
        // retrieve data from API endpt using the base url
        const users = await $fetch(`${baseUrl}/users`); // fetch all users from JSON Server
        return users; // return raw user data
      } catch (error) {
       // if the request was not successful, throw the error.
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to fetch users from JSON Server.',
          data: error,
        });
      }
    };
  
    // fetch details of a specific user
    const getUserDetails = async (id) => {
      try {
        const user = await $fetch(`${baseUrl}/users/${id}`); // fetch specific user by ID
        return user; // return user details
      } catch (error) {
        // if the request was not successful, throw the error.
        throw createError({
          statusCode: 500,
          statusMessage: `Failed to fetch user with ID ${id} from JSON Server.`,
          data: error,
        });
      }
    };

    // fetchde list of registered users
    const getRegisteredUsers = async () => {
      const { data, error } = await useFetch('/api/events_registered_users');
      if (error) throw new Error('Failed to fetch registered users.');
      return data;
    };
  
    // fetch details of a specific registered user
    const getRegisteredUserDetails = async (id) => {
      const { data, error } = await useFetch(`/api/events_registered_users/${id}`);
      if (error) throw new Error(`Failed to fetch registered user with ID ${id}.`);
      return data;
    };
  
    // fetch the list of event types
    const getEventCategories = async () => {
      try {
        const eventCategories = await $fetch(`${baseUrl}/eventCategories`); // fetch all event types from JSON Server
        return eventCategories; // return raw event types data
      } catch (error) {
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to fetch event types from JSON Server.',
          data: error,
        });
      }
    };

    // fetch details of a specific event type
    const getEventCategoryDetails = async (id) => {
      try {
        const user = await $fetch(`${baseUrl}/eventCategories/${id}`); // fetch specific event-type by ID
        return user; // return event-type details
      } catch (error) {
        throw createError({
          statusCode: 500,
          statusMessage: `Failed to fetch event-type with ID ${id} from JSON Server.`,
          data: error,
        });
      }
    };

    // fetch the list of events
  const getEvents = async () => {
    try {
      const events = await $fetch(`${baseUrl}/events`); // Fetch all events from JSON Server
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
      console.log(`<---------------THIS IS EVENT ID: ${id}----->`);
      console.log(`event.type_id ${event.type_id}`);
      console.log(`event.owner_id ${event.owner_id}`);
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

  // create RSVP for an event
  const createRSVP = async (rsvp) => {
    try {
      const response = await $fetch(`${baseUrl}/events_rsvps`, {
        method: 'POST',
        body: rsvp, // Pass RSVP data to the JSON Server
      });
      return response; // Return the response from JSON Server
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create RSVP on JSON Server.',
        data: error,
      });
    }
  };

  // submit feedback for an event
  const submitFeedback = async (feedback) => {
    try {
      const response = await $fetch(`${baseUrl}/events_feedback`, {
        method: 'POST',
        body: feedback, // Pass feedback data to the JSON Server
      });
      return response; // Return the response from JSON Server
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to submit feedback to JSON Server.',
        data: error,
      });
    }
  };

    // fetch event feedback
  const getEventFeedback = async (eventId) => {
    try {
      const feedback = await $fetch(`${baseUrl}/events_feedback?event_id=${eventId}`);
      return feedback;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to fetch feedback for event with ID ${eventId} from JSON Server.`,
        data: error,
      });
    }
  };
    return { getUsers, getUserDetails,  getRegisteredUsers, getEventCategories, getEventCategoryDetails, 
      getEvents, getEventDetails, createRSVP, submitFeedback, getEventFeedback, getRegisteredUserDetails
    };
  };
