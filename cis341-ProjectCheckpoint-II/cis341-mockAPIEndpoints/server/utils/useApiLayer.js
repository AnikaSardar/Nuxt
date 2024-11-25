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
  
    return { getUsers, getUserDetails, getEventCategories, getEventCategoryDetails };
  };
