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
              <!-- Ensure that only registered users can rsvp using role_id, and disable rsvp button if the user is already rsvped -->
              <button 
                v-if="role_id === 3" 
                @click="rsvpToEvent(event.id)" 
                :disabled="rsvpStatus[event.id]">
                {{ rsvpStatus[event.id] ? "RSVP'd" : "RSVP" }}
              </button>
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
import { z } from 'zod';
import { useRouter } from 'vue-router'; // Import the useRouter hook
import { generateUniqueId } from './utils/generateUniqueId';

// Zod schema for event validation
const eventSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Event name is required').max(100, 'Event name is too long'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description is too long'),
  location: z.string().min(1, 'Location is required'),
  date: z.string().refine((date) => !isNaN(new Date(date).getTime()), 'Invalid date'),
  price: z.number().min(0, 'Price must be a positive number').optional(),
  attendees: z.number().min(0, 'Attendees count must be non-negative'),
});

const rsvpSchema = z.object({
  id: z.string(),
  user_id: z.number(),
  event_id: z.number(),
  registered: z.string().refine((date) => !isNaN(new Date(date).getTime()), 'Invalid registration date'),
});

const { getUserId } = useAuth();
const router = useRouter();

const events = ref([]);
const error = ref(null);
const status = ref('pending');
const userId = getUserId(); //retrieving user Id from the session
const rsvpStatus = ref({}); //disable rsvp button so that same user can't RSVP multiple times to the same event if successfully already RSVP-ed

const { getEvents, deleteEvent, fetchWithPost, getRegisteredUserDetails, fetchWithPatch } = useApiService();

const roleDetails = await getRegisteredUserDetails(userId);
const role_id = roleDetails.user.value?.role_id || 0;

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
  console.log('Navigating to create event page');
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

// RSVP to an event
const rsvpToEvent = async (eventId) => {
  try {
    const rsvpData = {
      id: generateUniqueId(),
      user_id: parseInt(userId, 10),
      event_id: eventId,
      registered: new Date().toISOString(),
    };

    // Validate RSVP data
    rsvpSchema.parse(rsvpData);

    const response = await fetchWithPost('/api/eventsRegisteredUsers/registeredUserRSVP', rsvpData);
    if (response.error) {
      error.value = 'Failed to RSVP user. Please try again.';
      console.error(response.error);
    } else {
      alert('Successfully RSVP’d to the event!');
      rsvpStatus.value[eventId] = true; // Mark event as RSVP'd
      router.push('/admin/eventList/newEvents');
      status.value = 'success';

      // Increment event attendees
      const event = events.value.find((e) => e.id === eventId);
      if (event) {
        event.attendees += 1;

        // Validate the updated event data
        eventSchema.parse(event);

        try {
          const endpoint = `/api/eventList/${eventId}`;
          const response = await fetchWithPatch(endpoint, event);

          if (response.error) {
            console.log('Failed to update event details. Please try again.');
          } else {
            console.log('Event details updated successfully!');
          }
        } catch (err) {
          alert('An unexpected error occurred.');
        }
      }
    }
  } catch (err) {
    error.value = err.message || 'An unexpected error occurred.';
    console.error(err);
    status.value = 'error';
  } finally {
    status.value = null;
  }
};
</script>

<style scoped>
@import url("~/assets/css/form.css");
</style>
