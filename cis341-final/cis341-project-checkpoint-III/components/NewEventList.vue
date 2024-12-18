<template>
  <div>
    <div>
      <h1>Available Events</h1>
      <p v-if="status === 'pending'">Loading...</p>
      <div v-else>
        <button @click="createEvent" style="margin-bottom: 20px;">Create New Event</button>
        <div v-if="filteredEvents.length === 0">
          <p>No upcoming events available.</p>
        </div>
        <div v-else>
          <ul>
            <li v-for="event in filteredEvents" :key="event.id">
              <NuxtLink :to="`/newEvents/viewEventDetails/${event.id}`">
                <em>{{ event.name }} - @{{ event.location }}</em>
                <p>Date: {{ new Date(event.date).toLocaleDateString() }}</p>
                <p>Attendees: {{ event.attendees }}</p>
              </NuxtLink>
              <button @click="editEvent(event.id)">Edit</button>
              <button @click="deleteEventById(event.id)">Delete</button>
            </li>
          </ul>
        </div>
      </div>
      <p v-if="error">{{ error.message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; // Import the useRouter hook

const router = useRouter(); // Initialize the router instance

const events = ref([]);
const error = ref(null);
const status = ref('pending');
const { getEvents, deleteEvent } = useApiService();

try {
  const response = await getEvents();
  
  if (response.events && Array.isArray(response.events.value)) {
    events.value = response.events.value; // Assign the actual array
    status.value = 'success';
  } else {
    console.error('Unexpected response format:', response);
    throw new Error('Invalid response format');
  }
} catch (err) {
  console.error('Error fetching events:', err);
  error.value = err;
  status.value = 'error';
}

// Filtered events computed property
const filteredEvents = computed(() => {
  const today = new Date();
  return events.value.filter((event) => new Date(event.date) >= today);
});

// Navigate to the create page when the Create button is clicked
const createEvent = () => {
  console.log("Navigating to create event page");
  router.push(`/admin/eventList/newEvents/createEventDetails`);
};

// Navigate to the edit page when the Edit button is clicked
const editEvent = (eventId) => {
  console.log(`Editing event with ID: ${eventId}`);
  router.push(`/admin/eventList/newEvents/editEventDetails/${eventId}`);
};

// Delete an event by ID
const deleteEventById = async (eventId) => {
  if (!confirm(`Are you sure you want to delete the event with ID ${eventId}?`)) {
    return;
  }

  try {
    await deleteEvent(eventId); // Call the API to delete the event
    alert('Event deleted successfully!');
    window.location.reload();
  } catch (err) {
    console.error('Error deleting event:', err);
    alert('Failed to delete event. Please try again.');
  }
};
</script>

<style scoped>
@import url("~/assets/css/form.css");
</style>
