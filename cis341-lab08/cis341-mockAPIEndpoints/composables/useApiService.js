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

    const getRegisteredUsers = async () => {
      const { data: user, error } = await useFetch(`/api/eventsRegisteredUsers`);
      return { registredUsers, error };
    };
  
    const getRegisteredUserDetails = async (id) => {
      const { data: user, error } = await useFetch(`/api/eventsRegisteredUsers/${id}`);
      return { registredUser, error };
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

<<<<<<< Updated upstream
=======
    // Fetch the list of events
>>>>>>> Stashed changes
    const getEvents = async () => {
      const { data: events, error } = await useFetch('/api/eventList');
      return { events, error };
    };
  
<<<<<<< Updated upstream
=======
    // Fetch details of a specific event 
>>>>>>> Stashed changes
    const getEventDetails = async (id) => {
      const { data: event, error } = await useFetch(`/api/eventList/${id}`);
      return { event, error };
    };
  
<<<<<<< Updated upstream
=======
    // post for rsvp
>>>>>>> Stashed changes
    const createRSVP = async (rsvp) => {
      const { data, error } = await useFetch('/api/eventList/rsvp', {
        method: 'POST',
        body: rsvp,
      });
      return { data, error };
    };
<<<<<<< Updated upstream
  
=======

    // post for feedback
>>>>>>> Stashed changes
    const submitFeedback = async (feedback) => {
      const { data, error } = await useFetch('/api/eventList/feedback', {
        method: 'POST',
        body: feedback,
      });
      return { data, error };
    };

<<<<<<< Updated upstream
    const getEventFeedback = async (eventId) => {
      console.log(`useAPIService.js --> getEventFeedback--> ${eventId}`)
      const { data: feedback, error } = await useFetch(`/api/eventFeedback/${eventId}`);
      console.log(`uuseAPIService.js -->  feebdbck--> ${JSON.stringify(feedback)}`)
      return { feedback, error };
    };
  
=======
    // get event feedback
    const getEventFeedback = async (eventId) => {
      const { data: feedback, error } = await useFetch(`/api/eventFeedback/${eventId}`);
      return { feedback, error };
    };

    // get event feedback details
>>>>>>> Stashed changes
    const getEventFeedbackDetails = async (userId) => {
      const { data: user, error } = await useFetch(`/api/userDetails/${userId}`);
      return { user, error };
    };

<<<<<<< Updated upstream
    // const getEventFeedback = async (eventId) => {
    //   const { data: feedbackList, error } = await useFetch(`/api/eventList/${eventId}/feedback`);
    //   return { feedbackList, error };
    // };
    
    // const getEventFeedback = async (eventId) => {
    //   try {
    //     // Fetch feedback entries for the given event
    //     const { data: feedbackEntries, error: feedbackError } = await useFetch(`/api/eventList/events_feedback`);
    //     if (feedbackError) throw new Error(feedbackError);
    
    //     // Filter feedback by eventId
    //     const filteredFeedback = feedbackEntries.filter(feedback => feedback.event_id === eventId);
    
    //     // Fetch all users for enriching feedback
    //     const { data: users, error: usersError } = await useFetch(`/api/events_registered_users`);
    //     if (usersError) throw new Error(usersError);
    
    //     // Fetch event details for metadata
    //     const { data: event, error: eventError } = await useFetch(`/api/eventList/${eventId}`);
    //     if (eventError) throw new Error(eventError);
    
    //     // Enrich feedback with user details
    //     const enrichedFeedback = filteredFeedback.map(feedback => ({
    //       ...feedback,
    //       user: users.find(user => user.id === feedback.user_id) || { full_name: "Unknown User" },
    //     }));
    
    //     return { event, feedbackList: enrichedFeedback, error: null };
    //   } catch (error) {
    //     console.error("Error fetching event feedback:", error);
    //     return { event: null, feedbackList: [], error };
    //   }
    // };
    
    


=======
>>>>>>> Stashed changes
    return { getUsers, getUserDetails,  getRegisteredUsers, getRegisteredUserDetails, getEventCategories, getEventCategoryDetails,  getEvents, getEventDetails, createRSVP, submitFeedback, getEventFeedback, getEventFeedbackDetails };
  };
