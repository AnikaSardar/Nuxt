// API call consolidation on client-side.
export const useApiService = () => {
    /* Define the necessary API handlers.*/

    // Fetch the list of users
    const getUsers = async () => {
      const { data: users, error } = await useFetch('/api/users');
      return { users, error }; // Reactive data and error
    };
  
    // Fetch details of a specific user
    const getUserDetails = async (id) => {
      const { data: user, error } = await useFetch(`/api/users/${id}`);
      return { user, error }; // Reactive data and error
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

    const getEvents = async () => {
      const { data: events, error } = await useFetch('/api/eventList');
      return { events, error };
    };
  
    const getEventDetails = async (id) => {
      const { data: event, error } = await useFetch(`/api/eventList/${id}`);
      return { event, error };
    };
  
    const createRSVP = async (rsvp) => {
      const { data, error } = await useFetch('/api/eventList/rsvp', {
        method: 'POST',
        body: rsvp,
      });
      return { data, error };
    };
  
    const submitFeedback = async (feedback) => {
      const { data, error } = await useFetch('/api/eventList/feedback', {
        method: 'POST',
        body: feedback,
      });
      return { data, error };
    };


    return { getUsers, getUserDetails, getEventCategories, getEventCategoryDetails,  getEvents, getEventDetails, createRSVP, submitFeedback };
  };
