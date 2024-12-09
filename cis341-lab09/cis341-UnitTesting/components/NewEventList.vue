<template>
  <div>
    <h1>Available Events</h1>
    <p v-if="status === 'pending'">Loading...</p>
    <div v-else>
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
          </li>
        </ul>
      </div>
    </div>
    <p v-if="error">{{ error.message }}</p>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';

const { getEvents } = useApiService();

const events = ref([]);
const error = ref(null);
const status = ref('pending');

try {
  const response = await getEvents();
  
  // Access the events array inside the RefImpl
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
  return events.value.filter(event => new Date(event.date) >= today);
});
</script>
<style scoped>
@import url("~/assets/css/form.css");
</style>