import axios from "axios";

// Create store
export const useEventCategoriesStore = defineStore("eventCategories", () => {
  const eventCategories = ref([]);
  const error = ref(null);

  // Actions that correspond to CRUD operations for getting events
  // adding an event category, updating an event category, and removing an event category.
  const fetchEventCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:3333/eventCategories"); // using axios over fetch/useFetch (used for components); here not worried about caching
      eventCategories.value = data;
      error.value = null;
    } catch (err) {
      error.value = "Failed to fetch event categories. Please try again.";
    }
  };

  const addEventCategory = async (eventCategory) => {
    try {
      eventCategory.id = generateId(eventCategory.name);
      const { data } = await axios.post("http://localhost:3333/eventCategories", eventCategory);
      eventCategories.value.push(data);
      error.value = null;
    } catch (err) {
      error.value = "Failed to add event category. Please try again.";
    }
  };

  const updateEventCategory = async (updatedEventCategory) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3333/eventCategories/${updatedEventCategory.id}`,
        updatedEventCategory
      );
      const index = eventCategories.value.findIndex((eventCategory) => eventCategory.id === data.id);
      if (index !== -1) {
        eventCategories.value[index] = data;
      }
      error.value = null;
    } catch (err) {
      error.value = "Failed to update event category. Please try again.";
    }
  };

  const deleteEventCategory = async (eventCategoryId) => {
    try {
      await axios.delete(`http://localhost:3333/eventCategories/${eventCategoryId}`);
      eventCategories.value = eventCategories.value.filter((eventCategory) => eventCategory.id !== eventCategoryId);
      error.value = null;
    } catch (err) {
      error.value = "Failed to remove event category. Please try again.";
    }
  };

  return {
    eventCategories,
    error,
    fetchEventCategories,
    addEventCategory,
    updateEventCategory,
    deleteEventCategory,
  };
});
