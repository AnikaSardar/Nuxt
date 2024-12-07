<template>
  <div>
      <h1>Event Details</h1>
      <!-- Loading state -->
      <div v-if="pending">Loading event details...</div>

      <!-- Error state -->
      <div v-else-if="error">
        <p>Error loading event details. Please try again later.</p>
      </div>

      <!-- Event details -->
      <div v-else>
        <h2>{{ event.name }}</h2>
        <p>{{ event.description }}</p>
        <p>Location: {{ event.location }}</p>
        <p>Date: {{ new Date(event.date).toLocaleDateString() }}</p>
        <p>Price: ${{ event.price }}</p>
        <p>Attendees: {{ event.attendees }}</p>
        <p>Event Owner: {{ event.eventOwner.full_name }}</p>
        <p>Event Type: {{ event.eventType.name }}</p> 
    </div>

    <NuxtLink to="/newEvents">Back to Event List</NuxtLink>
    </div>
  </template>
  
  <script setup>
  const route = useRoute();
  const { data: event, error, pending } = await useFetch(`/api/eventList/${route.params.id}`);

  if (error.value) {
  console.log(`DATA: ${JSON.stringify(event)}`);
}

  </script>


  