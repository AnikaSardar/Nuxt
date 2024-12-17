export const useApiLayer = () => {
    const baseUrl = 'http://localhost:3333';
  // fetch the list of events
  const getRegisteredUsers = async () => {
    try {
      const registered_users =  await $fetch(`${baseUrl}/events_registered_users`); // Fetch all events from JSON Server
      return registered_users; // Return raw event data
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch registered users.',
        data: error,
      });
    }
  };
  
    // fetch details of a specific registered user
    const getRegisteredUserDetails = async (id) => {
      try {
        // Fetch event details
        const registered_user = await $fetch(`${baseUrl}/events_registered_users/${id}`);
        // Fetch related data
        const roleType_without_sanitize = await $fetch(`${baseUrl}/events_roles/${registered_user.id}`);
        const roleType = roleType_without_sanitize.name.replace(/_/g, ' ');
        //const eventOwner = await $fetch(`${baseUrl}/events_registered_users/${event.owner_id}`);
        // Add related data to the event object
        return { ...registered_user, roleType };
      } catch (error) {
        throw createError({
          statusCode: 500,
          statusMessage: `Failed to fetch event with ID ${id} from JSON Server.`,
          data: error,
        });
      }
    };

    
  // Update details of a specific registered user
  const updateRegisteredUser = async (id, userDetails) => {
    try {
      const response = await $fetch(`${baseUrl}/events_registered_users/${id}`, {
        method: 'PUT', // Use PUT for updating existing resources
        body: userDetails, // Send the updated user details in the body
      });
      return response; // Return the response from the server (the updated user data or success message)
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to update registered user with ID ${id}.`,
        data: error,
      });
    }
  };

  const createRegisteredUser = async (userDetails) => {
    try {
      const response = await $fetch(`${baseUrl}/events_registered_users`, {
        method: 'POST', // Use POST for updating existing resources
        body: userDetails, // Send the updated user details in the body
      });
      return response; // Return the response from the server (the updated user data or success message)
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to update registered user with ID ${id}.`,
        data: error,
      });
    }
  };

  
    // fetch the list of event types
    const getEventCategories = async () => {
      try {
        const eventCategories = await $fetch(`${baseUrl}/events_types`); // fetch all event types from JSON Server
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
        const user = await $fetch(`${baseUrl}/events_types/${id}`); // fetch specific event-type by ID
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

const fetchWithPatch = async (endpoint, data) => {
      try {
          const response = await fetch(endpoint, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          });
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return await response.json();
      } catch (error) {
          return { error };
      }
  };

  const fetchWithPost = async (endpoint, data) => {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        return { error };
    }
};

const fetchWithDelete = async (endpoint, data) => {
  try {
      const response = await fetch(endpoint, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
      });
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
  } catch (error) {
      return { error };
  }
};

  // Update details of a specific registered user
  const deleteRegisteredUser = async (id) => {
    try {
      const response = await $fetch(`${baseUrl}/events_registered_users/${id}`, {
        method: 'DELETE', // Use PUT for updating existing resources
      });
      return response; // Return the response from the server (the updated user data or success message)
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to update registered user with ID ${id}.`,
        data: error,
      });
    }
  };

    return {fetchWithDelete, deleteRegisteredUser,createRegisteredUser, fetchWithPost, fetchWithPatch, updateRegisteredUser, getRegisteredUsers, getEventCategories, getEventCategoryDetails, 
      getEvents, getEventDetails, getRegisteredUserDetails
    };
  };
