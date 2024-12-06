// API call consolidation on client-side.
export const useApiService = () => {

    // Define a reactive reference to store the list of eventList.
    const eventList = ref([]);

    // Fetch the list of events
    const getEvents = async () => {
      const { data: events, error } = await useFetch('/api/eventList');
      eventList.value = events; 
      return { events, error };
    };
  
    // Fetch details of a specific event 
    const getEventDetails = async (id) => {
      const { data: event, error } = await useFetch(`/api/eventList/${id}`);
      return { event, error };
    };
    return { getEvents, getEventDetails, eventList };
  };
