// API call consolidation on client-side.
export const useApiService = () => {
  
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
    return { getEvents, getEventDetails };
  };
