// API call consolidation on client-side.
export const useApiService = () => {
    /* Define the necessary API handlers.*/

    // Fetch the list of users
    // const getUsers = async () => {
    //   const { data: users, error } = await useFetch('/api/users');
    //   return { users, error }; // Reactive data and error
    // };
  
    // // Fetch details of a specific user
    // const getUserDetails = async (id) => {
    //   const { data: user, error } = await useFetch(`/api/users/${id}`);
    //   return { user, error }; // Reactive data and error
    // };

    const getRegisteredUsers = async () => {
      const { data: user, error } = await useFetch(`/api/eventsRegisteredUsers`);
      return { user, error };
    };
  
    // const getRegisteredUserDetails = async (id) => {
    //   const { data: user, error } = await useFetch(`/api/eventsRegisteredUsers/${id}`);
    //   console.log(`USEAPISERVICE: DATA: ${JSON.stringify(user)}`);
    //   return { user, error };
    // };
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
  
    // post for rsvp
    const createRSVP = async (rsvp) => {
      const { data, error } = await useFetch('/api/eventList/rsvp', {
        method: 'POST',
        body: rsvp,
      });
      return { data, error };
    };

    // post for feedback
    const submitFeedback = async (feedback) => {
      const { data, error } = await useFetch('/api/eventList/feedback', {
        method: 'POST',
        body: feedback,
      });
      return { data, error };
    };

    // get event feedback
    const getEventFeedback = async (eventId) => {
      const { data: feedback, error } = await useFetch(`/api/eventFeedback/${eventId}`);
      return { feedback, error };
    };

    // get event feedback details
    const getEventFeedbackDetails = async (userId) => {
      const { data: user, error } = await useFetch(`/api/userDetails/${userId}`);
      return { user, error };
    };

    // Update details of a specific registered user
    const updateRegisteredUser = async (id, userDetails) => {
      const { data, error } = await useFetch(`/api/eventsRegisteredUsers/${id}`, {
        method: 'PUT',
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
  

    return { fetchWithPatch, updateRegisteredUser, getRegisteredUsers, getRegisteredUserDetails, getEventCategories, getEventCategoryDetails,  getEvents, getEventDetails, createRSVP, submitFeedback, getEventFeedback, getEventFeedbackDetails };
  };
