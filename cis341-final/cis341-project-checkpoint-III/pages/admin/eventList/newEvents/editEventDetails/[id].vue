<template>
  <div>
    <h1>Edit Event Details</h1>
    <p v-if="status === 'pending'">Loading event details...</p>
    <div v-else>
      <!-- Prevent submit and validation checks for the edit fields -->
      <form @submit.prevent="saveEventDetails">
        <div>
          <label for="name">Event Name:</label>
          <input id="name" v-model="editableEvent.name" type="text" />
          <p v-if="errors.name" class="error">{{ errors.name }}</p>
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea id="description" v-model="editableEvent.description"></textarea>
          <p v-if="errors.description" class="error">{{ errors.description }}</p>
        </div>
        <div>
          <label for="location">Location:</label>
          <input id="location" v-model="editableEvent.location" type="text" />
          <p v-if="errors.location" class="error">{{ errors.location }}</p>
        </div>
        <div>
          <label for="date">Date:</label>
          <input id="date" v-model="editableEvent.date" type="date" :min="today" />
          <p v-if="errors.date" class="error">{{ errors.date }}</p>
        </div>
        <div>
          <label for="price">Price:</label>
          <input id="price" v-model="editableEvent.price" type="number" />
          <p v-if="errors.price" class="error">{{ errors.price }}</p>
        </div>
        <div>
          <label for="attendees">Attendees:</label>
          <input id="attendees" v-model="editableEvent.attendees" type="number" />
          <p v-if="errors.attendees" class="error">{{ errors.attendees }}</p>
        </div>
        <div>
          <label for="eventOwner">Event Owner:</label>
          <input id="eventOwner" v-model="event.eventOwner.full_name" type="text" disabled />
        </div>
        <div>
          <label for="eventType">Event Type:</label>
          <input id="eventType" v-model="event.eventType.name" type="text" disabled />
        </div>
        <button type="submit" @click="goBackToEventList">Update Event</button>
      </form>
    </div>

    <p v-if="error">{{ error.statusMessage }}</p>
    <button @click="goBackToEventList" style="margin-top: 10px;">Back to Event List</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { z } from 'zod';

const { fetchWithPatch } = useApiService();

useHead({
  title: 'Edit Event Details',
});

const route = useRoute();
const router = useRouter();
const { data: event, error, pending: status } = await useFetch(`/api/eventList/${route.params.id}`);

const today = new Date().toISOString().split('T')[0];

// reactive event
const editableEvent = ref({
  name: event.value?.name || '',
  description: event.value?.description || '',
  location: event.value?.location || '',
  date: event.value?.date?.split('T')[0] || '', // Extract only the date part
  price: event.value?.price || '',
  attendees: event.value?.attendees || '',
});

const errors = ref({});

// schema for zod
const eventSchema = z.object({
  name: z.string().min(1, { message: 'Event name is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  location: z.string().min(1, { message: 'Location is required.' }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format.',
  }),
  price: z.number().positive({ message: 'Price must be positive.' }),
  attendees: z.number().int().nonnegative({ message: 'Attendees must be a non-negative integer.' }),
});

// validate form logic
const validateForm = () => {
  const validation = eventSchema.safeParse(editableEvent.value);

  if (!validation.success) {
    const errorMap = validation.error.errors.reduce((acc, curr) => {
      acc[curr.path[0]] = curr.message;
      return acc;
    }, {});
    errors.value = errorMap;
    return false;
  }
  errors.value = {};
  return true;
};

// save event else throw an alert
const saveEventDetails = async () => {
  if (!validateForm()) {
    alert('Please fix the errors in the form.');
    return;
  }
// error handling
  try {
    const updatedEvent = {
      ...editableEvent.value,
      date: new Date(`${editableEvent.value.date}T09:00:00Z`).toISOString(),
      owner_id: event.value.owner_id,
      type_id: event.value.type_id,
    };

    // specify the endpt and response
    const endpoint = `/api/eventList/${route.params.id}`;
    const response = await fetchWithPatch(endpoint, updatedEvent);

    if (response.error) {
      alert('Failed to update event details. Please try again.');
    } else {
      alert('Event details updated successfully!');
    }
  } catch (err) {
    alert('An unexpected error occurred.');
  }
};

// route back to event list
const goBackToEventList = () => {
  router.push('/admin/eventList/newEvents').then(() => {
    window.location.reload();
  });
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
}

input,
textarea {
  padding: 5px;
  font-size: 16px;
}

button {
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  font-size: 14px;
}
</style>
