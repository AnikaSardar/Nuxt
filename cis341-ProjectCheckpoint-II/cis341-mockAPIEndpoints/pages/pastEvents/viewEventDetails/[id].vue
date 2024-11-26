<template>
    <div>
      <h1>Event Details</h1>
      <h2>{{ event.name }}</h2>
      <p>{{ event.description }}</p>
      <p>Location: {{ event.location }}</p>
      <p>Date: {{ new Date(event.date).toLocaleDateString() }}</p>
      <p>Price: ${{ event.price }}</p>
      <p>Attendees: {{ event.attendees }}</p>

      <h2>RSVP</h2>
      <button @click="rsvpHandler">RSVP to this event</button>
  
      <h2>Submit Feedback</h2>
      <!-- TODO: Fix submit feedback -->
      <!-- <form @submit.prevent="submitFeedbackHandler">
        <textarea v-model="feedback.comment" required></textarea>
        <button type="submit">Submit</button>
      </form> -->

      <h2>Feedback</h2>
    <!-- TODO: Fix reading operation for feedback -->
    <!-- <ul>
      <li v-for="feedback in eventFeedback" :key="feedback.event_id">
        <p><strong>{{ feedback.user_id }}</strong> commented:</p>
        <p>{{ feedback.comment }}</p>
        <p>Submitted on: {{ new Date(feedback.submitted).toLocaleString() }}</p>
      </li>
    </ul>  -->

      <NuxtLink to="/pastEvents">User Back to Event List</NuxtLink>
    </div>
  </template>
  
  <script setup>
  
  const { getEventDetails, createRSVP, submitFeedback, getEventCategories, getEventFeedback, getEventFeedbackDetails } = useApiService();
  const eventId = useRoute().params.id;
  
  const { event} = await getEventDetails(eventId);
  const { eventCategories, error: typeError } = await getEventCategories();

  const { eventFeedback, error, status } = await getEventFeedback(eventId);

  // Access the feedback value
const e_feedback = eventFeedback?.value || [];
console.log(`[id].vue ---> eventFeedback--> ${JSON.stringify(e_feedback)}`);
  
  // was suppose to post feedback
  const submitFeedbackHandler = async () => {
    const { event, error } = await submitFeedback(feedback.value);
    if (error) {
      alert(error.statusMessage);
    } else {
      alert('Feedback submitted successfully.');
    }
  };
  
    // was suppose to handle rsvp
  const rsvpHandler = async () => {
    const { event, error } = await createRSVP({ event_id: eventId, user_id: 1 });
    if (error) {
      alert(error.statusMessage);
    } else {
      alert('RSVP successful.');
    }
  };

  </script>


  