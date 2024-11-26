<template>
    <div>
      <h1>Event Details</h1>
      <h2>{{ event.name }}</h2>
      <p>{{ event.description }}</p>
      <p>Location: {{ event.location }}</p>
      <p>Date: {{ new Date(event.date).toLocaleDateString() }}</p>
      <p>Price: ${{ event.price }}</p>
      <p>Attendees: {{ event.attendees }}</p>

      <NuxtLink to="/admin/eventList">Back to Event List</NuxtLink>
    </div>
  </template>
  
  <script setup>
  
  const { getEventDetails, createRSVP, submitFeedback, getEventCategories, getEventFeedback, getEventFeedbackDetails } = useApiService();
  const eventId = useRoute().params.id;
  
  const { event} = await getEventDetails(eventId);
  const { eventCategories, error: typeError } = await getEventCategories();

  const { eventFeedback, error, status } = await getEventFeedback(eventId);

  </script>


  