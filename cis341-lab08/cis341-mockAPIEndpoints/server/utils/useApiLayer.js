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

    const getRegisteredUsers = async () => {
      const { data, error } = await useFetch('/api/events_registered_users');
      if (error) throw new Error('Failed to fetch registered users.');
      return data;
    };
  
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
      const event = await $fetch(`${baseUrl}/events/${id}`); // Fetch specific event by ID
      return event; // Return event details
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



// const getEventFeedback = async (eventId) => {
//   try {
//     // Fetch all feedback for the given event ID
//     const feedbackList = await $fetch(`${baseUrl}/events_feedback`, {
//       method: "GET",
//     });

//     // Filter feedback related to the specific event
//     const eventFeedback = feedbackList.filter((feedback) => feedback.event_id === eventId);

//     if (!eventFeedback.length) {
//       throw createError({
//         statusCode: 404,
//         statusMessage: `No feedback found for event ID ${eventId}.`,
//       });
//     }

//     // Fetch event details
//     const events = await $fetch(`${baseUrl}/events`, { method: "GET" });
//     const event = events.find((e) => e.id === eventId);

//     if (!event) {
//       throw createError({
//         statusCode: 404,
//         statusMessage: `Event with ID ${eventId} not found.`,
//       });
//     }

//     // Fetch user details
//     const users = await $fetch(`${baseUrl}/events_registered_users`, { method: "GET" });

//     // Enrich feedback with user details
//     const feedbackWithUserDetails = eventFeedback.map((feedback) => {
//       const user = users.find((u) => u.id === feedback.user_id);
//       return {
//         ...feedback,
//         user: user ? { id: user.id, username: user.username, full_name: user.full_name } : null,
//       };
//     });

//     return {
//       event,
//       feedback: feedbackWithUserDetails,
//     };
//   } catch (error) {
//     throw createError({
//       statusCode: error.statusCode || 500,
//       statusMessage: error.statusMessage || `Failed to fetch feedback for event with ID ${eventId}.`,
//       data: error.data || error,
//     });
//   }
// };

const getEventFeedback = async (eventId) => {
  try {
    console.log(`useAPIService.js --> getEventFeedback --> ${eventId}`)
    const feedback = await $fetch(`${baseUrl}/events_feedback?event_id=${eventId}`);
    //debug
    console.log(`useAPILayer.js -->  feedback--> ${JSON.stringify(feedback)}`);

    return feedback;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch feedback for event with ID ${eventId} from JSON Server.`,
      data: error,
    });
  }
};

// const getRegisteredUserDetails = async (userId) => {
//   try {
//     const user = await $fetch(`${baseUrl}/events_registered_users/${userId}`);
//     return user; // Assuming ID is unique
//   } catch (error) {
//     throw createError({
//       statusCode: 500,
//       statusMessage: `Failed to fetch user with ID ${userId} from JSON Server.`,
//       data: error,
//     });
//   }
// };


    return { getUsers, getUserDetails,  getRegisteredUsers, getEventCategories, getEventCategoryDetails, 
      getEvents, getEventDetails, createRSVP, submitFeedback, getEventFeedback, getRegisteredUserDetails
    };
  };
