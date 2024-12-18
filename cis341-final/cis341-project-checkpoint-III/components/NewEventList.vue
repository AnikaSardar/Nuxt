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
import { useRouter } from 'vue-router'; // Import the useRouter hook
import { generateUniqueId } from "./utils/generateUniqueId";

const {getUserId} = useAuth();
const router = useRouter();

const events = ref([]);
const error = ref(null);
const status = ref('pending');
const userId = getUserId(); //retrieving user Id from the session
const rsvpStatus = ref({}); //disable rsvp button so that same user can't rsvp multiple times to the same event if successfully already rsvp-ed

const { getEvents, deleteEvent, fetchWithPost, getRegisteredUserDetails, fetchWithPatch } = useApiService();

const roleDetails = await getRegisteredUserDetails(userId);
const role_id = roleDetails.user.value?.role_id || 0;
//console.log("Roleeee is: ", role_id);

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

    // RSVP to an event
const rsvpToEvent = async (eventId) => {
  try {
    //await saveEventRSVP(rsvpData); // Save RSVP to the database
    const rsvpData = ref({
      id: generateUniqueId(),
      user_id: parseInt(userId, 10),
      event_id: eventId,
      registered: new Date().toISOString(),
      });
    const response = await fetchWithPost('/api/eventsRegisteredUsers/registeredUserRSVP', rsvpData.value);
      if (response.error) {
        error.value = 'Failed to RSVP user. Please try again.';
        console.error(response.error);
      } else {
        alert('Successfully RSVP’d to the event!');
        rsvpStatus.value[eventId] = true; // Mark event as RSVP'd
        router.push('/admin/eventList/newEvents');
        status.value = 'success';

        //increment event attendees
        const event = events.value.find((e) => e.id === eventId);
        if (event) {
          event.attendees += 1;
          // post the event so that DB also holds the correct number of attendees
          //const saveEventDetails = async () => {
            try {
                // const updatedEvent = {
                //   ...event.value,
                //   date: new Date(`${event.value.date}T09:00:00Z`).toISOString(),
                // };
            
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
            //};
        }
      }
    } catch (err) {
      error.value = 'An unexpected error occurred.';
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
