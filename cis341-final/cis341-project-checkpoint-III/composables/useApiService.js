// API call consolidation on client-side.
export const useApiService = () => {
    /* Define the necessary API handlers.*/

    const getRegisteredUsers = async () => {
      const { data: users, error } = await useFetch(`/api/eventsRegisteredUsers`);
      return { users, error };
    };


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

    const createRegisteredUser = async (userDetails) => {
      const { data, error } = await useFetch(`/api/eventsRegisteredUsers/registeredUserCreation`, {
        method: 'POST',
        body: userDetails,
      });
      return { data, error };
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

    const deleteRegisteredUser = async (userId) => {
      const { data, error } = await useFetch(`/api/eventsRegisteredUsers/${userId}`, {
        method: 'DELETE',
      });
      return { data, error };
    };

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

  // EVENTS
  
    // Update details of a specific event
    const updateEvent = async (id, eventDetails) => {
      const { data, error } = await useFetch(`/api/eventList/${id}`, {
        method: 'PUT',
        body: eventDetails,
      });
      return { data, error };
    };

    const createEvent= async (eventDetails) => {
      const { data, error } = await useFetch(`/api/eventList/newEventCreation`, {
        method: 'POST',
        body: eventDetails,
      });
      return { data, error };
    };

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

    const deleteEvent = async (eventId) => {
      const { data, error } = await useFetch(`/api/eventList/${eventId}`, {
        method: 'DELETE',
      });
      return { data, error };
    };

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

    // Event Categories
    // EVENTS
  
    // Update details of a specific event
    const updateEventCategories = async (id, eventDetails) => {
      const { data, error } = await useFetch(`/api/eventCategories/${id}`, {
        method: 'PUT',
        body: eventDetails,
      });
      return { data, error };
    };

    const createEventCategories= async (eventDetails) => {
      const { data, error } = await useFetch(`/api/eventCategories/eventCategoriesCreation`, {
        method: 'POST',
        body: eventDetails,
      });
      return { data, error };
    };

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

    const deleteEventCategories = async (eventId) => {
      const { data, error } = await useFetch(`/api/eventCategories/${eventId}`, {
        method: 'DELETE',
      });
      return { data, error };
    };

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


    return { fetchWithDELETE, deleteRegisteredUser, createRegisteredUser, fetchWithPost, fetchWithPatch, updateRegisteredUser, getRegisteredUsers, 
      getRegisteredUserDetails, getEventCategories, getEventCategoryDetails, getEvents, getEventDetails, updateEvent, createEvent, fetchEventWithPut, 
      fetchEventWithPost, deleteEvent, fetchEventWithDELETE, getRegisteredUserRoles, updateEventCategories, createEventCategories, deleteEventCategories,
       fetchEventCategoriesWithPut, fetchEventCategoriesWithPost, fetchEventCategoriesWithDELETE };
  };
