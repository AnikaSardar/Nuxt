<template>
    <div>
      <h1>Past Events</h1>
      <p v-if="status === 'pending'">Loading...</p>
    <div v-else>
      <div v-if="eventList.length === 0">
        <p>No past events available.</p>
      </div>
      <div v-else>
        <ul>
          <li v-for="event in eventList" :key="event.id">
            <NuxtLink :to="`/pastEvents/viewEventDetails/${event.id}`">
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

const { getEvents, eventList } = useApiService();
await getEvents(); // call getEvents

</script>
<style scoped>
@import url("~/assets/css/form.css");
</style>
  