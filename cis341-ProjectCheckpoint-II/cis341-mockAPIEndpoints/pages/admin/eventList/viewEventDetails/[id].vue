<template>
    <div>
      <h1>View Event Details</h1>
      <h1>{{ event.name }}</h1>
      <p>{{ event.description }}</p>
      <p>Location: {{ event.location }}</p>
      <p>Date: {{ new Date(event.date).toLocaleDateString() }}</p>
      <p>Attendees: {{ event.attendees }}</p>
  
      <h2>Submit Feedback</h2>
      <form @submit.prevent="submitFeedbackHandler">
        <textarea v-model="feedback.comment" required></textarea>
        <button type="submit">Submit</button>
      </form>
  
      <h2>RSVP</h2>
      <button @click="rsvpHandler">RSVP to this event</button>
  
      <h2>Feedback</h2>
      <ul>
        <li v-for="feedback in event.feedback" :key="feedback.id">
          {{ feedback.comment }} - {{ feedback.user_name }}
        </li>
      </ul>

      <NuxtLink to="/admin/eventList">Back to Event List</NuxtLink>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const { getEventDetails, createRSVP, submitFeedback, getEventCategories } = useApiService();
  const eventId = useRoute().params.id;
  
  const { event, error, status } = await getEventDetails(eventId);
  const { eventCategories, error: typeError } = await getEventCategories();

  const feedback = ref({ event_id: eventId, user_id: 1, comment: '' });
  
  const submitFeedbackHandler = async () => {
    const { event, error } = await submitFeedback(feedback.value);
    if (error) {
      alert(error.statusMessage);
    } else {
      alert('Feedback submitted successfully.');
    }
  };
  
  const rsvpHandler = async () => {
    const { event, error } = await createRSVP({ event_id: eventId, user_id: 1 });
    if (error) {
      alert(error.statusMessage);
    } else {
      alert('RSVP successful.');
    }
  };
  </script>
  