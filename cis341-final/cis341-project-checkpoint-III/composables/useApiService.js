// API call consolidation on client-side.
export const useApiService = () => {
    /* Define the necessary API handlers.*/

    // retrieve registered users from the server/api route
    const getRegisteredUsers = async () => {
      const { data: users, error } = await useFetch(`/api/eventsRegisteredUsers`);
      return { users, error };
    };

    // retrieve registered user roles from the server/api route
    const getRegisteredUserRoles = async () => {
      const { data: roles, error } = await useFetch(`/api/eventUserRoles`);
      return { roles, error };
    };
  
    // Fetch details of a specific registered user 
    const getRegisteredUserDetails = async (id) => {
      const { data: user, error } = await useFetch(`/api/eventsRegisteredUsers/${id}`);
      return { user, error };
    };
  

    // Fetch the list of event types
    const getEventCategories = async () => {
      const { data: eventCategories, error } = await useFetch('/api/eventCategories');
      return { eventCategories, error }; // Reactive data and error
    };
    
    // Fetch details of a specific event type
    const getEventCategoryDetails = async (id) => {
      const { data: eventCategory, error } = await useFetch(`/api/eventCategories/${id}`);
      return { eventCategory, error }; // Reactive data and error
    };

    // Fetch the list of events
    const getEvents = async () => {
      const { data: events, error } = await useFetch('/api/eventList');
      return { events, error };
    };
  
    // Fetch details of a specific event 
    const getEventDetails = async (id) => {
      const { data: event, error } = await useFetch(`/api/eventList/${id}`);
      return { event, error };
    };
  
    // Update details of a specific registered user
    const updateRegisteredUser = async (id, userDetails) => {
      const { data, error } = await useFetch(`/api/eventsRegisteredUsers/${id}`, {
        method: 'PUT',
        body: userDetails,
      });
      return { data, error };
    };

    // Create a Registered User
    const createRegisteredUser = async (userDetails) => {
      const { data, error } = await useFetch(`/api/eventsRegisteredUsers/registeredUserCreation`, {
        method: 'POST',
        body: userDetails,
      });
      return { data, error };
    };

    // Create Event RSVP (for incrementing RSVP attendees)
    const createEventRSVP = async (rsvpDetails) => {
      const { data, error } = await useFetch(`/api/eventsRegisteredUsers/registeredUserRSVP`, {
        method: 'POST',
        body: rsvpDetails,
      });
      return { data, error };
    };

    // updates attendees
    const updateEventRSVP = async (id, eventDetails) => {
      const { data, error } = await useFetch(`/api/eventList/${id}`, {
        method: 'PUT',
        body: eventDetails,
      });
      return { data, error };
    };

    // update func
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

    // fetch func
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

    // delete registered user
    const deleteRegisteredUser = async (userId) => {
      const { data, error } = await useFetch(`/api/eventsRegisteredUsers/${userId}`, {
        method: 'DELETE',
      });
      return { data, error };
    };

    // delete func
    const fetchWithDELETE = async (endpoint, data) => {
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

    // Update details of a specific event
    const updateEvent = async (id, eventDetails) => {
      const { data, error } = await useFetch(`/api/eventList/${id}`, {
        method: 'PUT',
        body: eventDetails,
      });
      return { data, error };
    };

    // create event details
    const createEvent= async (eventDetails) => {
      const { data, error } = await useFetch(`/api/eventList/newEventCreation`, {
        method: 'POST',
        body: eventDetails,
      });
      return { data, error };
    };

    // update func
    const fetchEventWithPut = async (endpoint, data) => {
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

    // create func
    const fetchEventWithPost = async (endpoint, data) => {
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

    // delete event
    const deleteEvent = async (eventId) => {
      const { data, error } = await useFetch(`/api/eventList/${eventId}`, {
        method: 'DELETE',
      });
      return { data, error };
    };

    // delete func
    const fetchEventWithDELETE = async (endpoint, data) => {
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

    // Update details of a specific event type
    const updateEventCategories = async (id, eventDetails) => {
      const { data, error } = await useFetch(`/api/eventCategories/${id}`, {
        method: 'PUT',
        body: eventDetails,
      });
      return { data, error };
    };

    // create a new event type
    const createEventCategories= async (eventDetails) => {
      const { data, error } = await useFetch(`/api/eventCategories/eventCategoriesCreation`, {
        method: 'POST',
        body: eventDetails,
      });
      return { data, error };
    };

    // update func
    const fetchEventCategoriesWithPut = async (endpoint, data) => {
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

    // create func
    const fetchEventCategoriesWithPost = async (endpoint, data) => {
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

    // delete event types
    const deleteEventCategories = async (eventId) => {
      const { data, error } = await useFetch(`/api/eventCategories/${eventId}`, {
        method: 'DELETE',
      });
      return { data, error };
    };

    // delete func
    const fetchEventCategoriesWithDELETE = async (endpoint, data) => {
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

    return { updateEventRSVP, createEventRSVP, fetchWithDELETE, deleteRegisteredUser, createRegisteredUser, fetchWithPost, fetchWithPatch, updateRegisteredUser, getRegisteredUsers, 
      getRegisteredUserDetails, getEventCategories, getEventCategoryDetails, getEvents, getEventDetails, updateEvent, createEvent, fetchEventWithPut, 
      fetchEventWithPost, deleteEvent, fetchEventWithDELETE, getRegisteredUserRoles, updateEventCategories, createEventCategories, deleteEventCategories,
       fetchEventCategoriesWithPut, fetchEventCategoriesWithPost, fetchEventCategoriesWithDELETE };
  };
