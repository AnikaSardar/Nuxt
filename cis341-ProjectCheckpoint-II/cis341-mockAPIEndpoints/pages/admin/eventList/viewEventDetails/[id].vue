<template>
    <div>
      <h1>Event Details</h1>
      <h2>{{ event.name }}</h2>
      <p>{{ event.description }}</p>
      <p>Location: {{ event.location }}</p>
      <p>Date: {{ new Date(event.date).toLocaleDateString() }}</p>
      <p>Attendees: {{ event.attendees }}</p>
  
      <!-- <h2>Submit Feedback</h2>
      <form @submit.prevent="submitFeedbackHandler">
        <textarea v-model="feedback.comment" required></textarea>
        <button type="submit">Submit</button>
      </form> -->
  
      <h2>RSVP</h2>
      <button @click="rsvpHandler">RSVP to this event</button>
  
      <!-- <h2>Feedback</h2>
      <ul>
        <li v-for="feedback in event.feedback" :key="feedback.id">
          {{ feedback.comment }} - {{ feedback.user_name }}
        </li>
      </ul> -->

      <h2>Feedback</h2>
    <ul>
      <li v-for="feedback in eventFeedback" :key="feedback.event_id">
        <p><strong>{{ feedback.user_id }}</strong> commented:</p>
        <p>{{ feedback.comment }}</p>
        <p>Submitted on: {{ new Date(feedback.submitted).toLocaleString() }}</p>
      </li>
    </ul> 

      <NuxtLink to="/admin/eventList">Back to Event List</NuxtLink>
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
console.log(`[id].vue eventFeedback: ${JSON.stringify(e_feedback)}`);
  
//   //const eventFeedback = ref([]);
//   const feedback = ref({ comment: '' });
  
// const loadEventFeedback = async (eventId) => {
//   const { feedback: feedbackData, error } = await getEventFeedback(eventId);
//   if (error) {
//     console.error('Failed to load event feedback:', error.statusMessage);
//   } else {
//     // For each feedback, fetch user details (e.g., full name)
//     const detailedFeedback = await Promise.all(
//       feedbackData.map(async (feedbackItem) => {
//         const { user, error: userError } = await getUserDetails(feedbackItem.user_id);
//         if (userError) {
//           console.error('Failed to fetch user details:', userError.statusMessage);
//         }
//         return {
//           ...feedbackItem,
//           user_name: user ? user.full_name : 'Unknown User', // Fallback if user details are not found
//         };
//       })
//     );
//     eventFeedback.value = detailedFeedback;
//   }
// };

  
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


  