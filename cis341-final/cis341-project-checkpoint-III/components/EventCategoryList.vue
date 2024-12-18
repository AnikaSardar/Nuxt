<template>
  <div>
    <h1>Event Category List</h1>
    <p v-if="status === 'pending'">Loading...</p>
    <div v-else>
      <!-- Create functionality -->
      <button @click="createEventCategory" style="margin-bottom: 20px;">Create New Event Category</button>
      <div v-if="eventCategories.length === 0">
        <p>No event categories available.</p>
      </div>
      <div v-else>
        <ul>
          <li v-for="eventCategory in eventCategories" :key="eventCategory.id">
            <NuxtLink :to="`/admin/eventCategoryManagement/viewEventCategoryDetails/${eventCategory.id}`">
              Name: {{ eventCategory.name }} | ID: {{ eventCategory.id }}
            </NuxtLink>
            <!-- Edit and delete functionality -->
            <button @click="editEventCategory(eventCategory.id)">Edit</button>
            <button @click="deleteEventCategoryById(eventCategory.id)">Delete</button>
          </li>
        </ul>
      </div>
    </div>
    <p v-if="error">{{ error.message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Import the useRouter hook

const router = useRouter(); // Initialize the router instance

const eventCategories = ref([]);
const error = ref(null);
const status = ref('pending');
const { getEventCategories, deleteEventCategories } = useApiService();

try {
  const response = await getEventCategories();
  
  if (response.eventCategories && Array.isArray(response.eventCategories.value)) {
    console.log(`response.eventCategories.value ${JSON.stringify(response.eventCategories.value)}`)
    eventCategories.value = response.eventCategories.value; // Assign the actual array
    status.value = 'success';
  } else {
    console.error('Unexpected response format:', response);
    throw new Error('Invalid response format');
  }
} catch (err) {
  console.error('Error fetching event categories:', err);
  error.value = err;
  status.value = 'error';
}

// Navigate to the create page when the Create button is clicked
const createEventCategory = () => {
  console.log("Navigating to create event category page");
  router.push(`/admin/eventCategoryManagement/createEventCategoryDetails`);
};

// Navigate to the edit page when the Edit button is clicked
const editEventCategory = (categoryId) => {
  console.log(`Editing event category with ID: ${categoryId}`);
  router.push(`/admin/eventCategoryManagement/editEventCategoryDetails/${categoryId}`);
};

// Delete an event category by ID
const deleteEventCategoryById = async (categoryId) => {
  if (!confirm(`Are you sure you want to delete the event category with ID ${categoryId}?`)) {
    return;
  }

  try {
    await deleteEventCategories(categoryId); // Call the API to delete the event category
    alert('Event category deleted successfully!');
    window.location.reload();
  } catch (err) {
    console.error('Error deleting event category:', err);
    alert('Failed to delete event category. Please try again.');
  }
};
</script>

<style scoped>
@import url("~/assets/css/form.css");
</style>
