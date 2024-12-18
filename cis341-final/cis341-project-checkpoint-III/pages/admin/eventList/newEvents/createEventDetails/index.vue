<template>
  <div>
    <h1>Create New Event</h1>
    <p v-if="status === 'pending'">
      Creating new event... We'll redirect you to the event list once we're done.
    </p>
    <div v-else>
      <!-- Prevent submit and validation checks for the fields -->
      <form @submit.prevent="createEvent">
        <div>
          <label for="name">Event Name:</label>
          <input id="name" v-model="newEvent.name" :class="{ 'error-border': validationErrors.name }" type="text" required />
          <p v-if="validationErrors.name" class="error-message">{{ validationErrors.name }}</p>
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea id="description" v-model="newEvent.description" :class="{ 'error-border': validationErrors.description }" required></textarea>
          <p v-if="validationErrors.description" class="error-message">{{ validationErrors.description }}</p>
        </div>
        <div>
          <label for="location">Location:</label>
          <input id="location" v-model="newEvent.location" :class="{ 'error-border': validationErrors.location }" type="text" required />
          <p v-if="validationErrors.location" class="error-message">{{ validationErrors.location }}</p>
        </div>
        <div>
          <label for="date">Date:</label>
          <input id="date" v-model="newEvent.date" :min="today" :class="{ 'error-border': validationErrors.date }" type="date" required />
          <p v-if="validationErrors.date" class="error-message">{{ validationErrors.date }}</p>
        </div>
        <div>
          <label for="price">Price:</label>
          <input id="price" v-model.number="newEvent.price" :class="{ 'error-border': validationErrors.price }" type="number" required />
          <p v-if="validationErrors.price" class="error-message">{{ validationErrors.price }}</p>
        </div>
        <div>
          <label for="attendees">Attendees:</label>
          <input id="attendees" v-model.number="newEvent.attendees" :class="{ 'error-border': validationErrors.attendees }" type="number" required />
          <p v-if="validationErrors.attendees" class="error-message">{{ validationErrors.attendees }}</p>
        </div>
        <div>
          <label for="eventType">Event Type:</label>
          <select id="eventType" v-model="newEvent.type_id" :class="{ 'error-border': validationErrors.type_id }" required>
            <option v-for="type in eventTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
          </select>
          <p v-if="validationErrors.type_id" class="error-message">{{ validationErrors.type_id }}</p>
        </div>
        <div>
          <label for="eventOwner">Event Owner:</label>
          <select id="eventOwner" v-model="newEvent.owner_id" :class="{ 'error-border': validationErrors.owner_id }" required>
            <option v-for="type in eventOwners" :key="type.id" :value="type.id">{{ type.full_name }}</option>
          </select>
          <p v-if="validationErrors.owner_id" class="error-message">{{ validationErrors.owner_id }}</p>
        </div>
        <button type="submit" @click="goBackToEventList">Save</button>
      </form>
    </div>
    <button @click="goBackToEventList" style="margin-top: 10px;">Back to Event List</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { z } from 'zod';
import { generateUniqueId } from './utils/generateUniqueId';

// Using zod for validation purposes 

const eventSchema = z.object({
  id: z.number(),
  name: z.string().min(3, 'Event name must be at least 3 characters long.'),
  description: z.string().min(10, 'Description must be at least 10 characters long.'),
  location: z.string().min(3, 'Location must be at least 3 characters long.'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format.'),
  price: z.number().min(0, 'Price must be a positive number.'),
  attendees: z.number().min(1, 'Attendees must be at least 1.'),
  type_id: z.number(),
  owner_id: z.number(),
});

const router = useRouter();
const { fetchWithPost, getEventCategories, getRegisteredUsers } = useApiService();

// hold reactive properties for creation
const newEvent = ref({
  id: '',
  name: '',
  description: '',
  location: '',
  date: '',
  price: '',
  attendees: '',
  type_id: '',
  owner_id: '',
});

// initialize ref var
const validationErrors = ref({});
const today = new Date().toISOString().split('T')[0];
const status = ref(null);
const eventTypes = ref([]);
const eventOwners = ref([]);

// validate event creation fields
const validateEvent = () => {
  validationErrors.value = {};
  try {
    newEvent.value.id = generateUniqueId();
    eventSchema.parse(newEvent.value);
    return true;
  } catch (err) {
    err.errors.forEach((e) => {
      validationErrors.value[e.path[0]] = e.message;
    });
    return false;
  }
};

// create event if everything works as expected
const createEvent = async () => {
  if (!validateEvent()) return;

  // add error handling
  try {
    status.value = 'pending';
    const response = await fetchWithPost('/api/eventList/eventCreation', newEvent.value);
    if (response.error) {
      alert('Failed to create event. Please try again.');
      console.error(response.error);
    } else {
      alert('Event created successfully!');
      router.push('/admin/eventList/newEvents');
    }
  } catch (err) {
    alert('An unexpected error occurred.');
    console.error(err);
  } finally {
    status.value = null;
  }
};

// go back tp event list once done
const goBackToEventList = () => {
  router.push('/admin/eventList/newEvents');
};

//load event types 
const loadEventTypes = async () => {
  try {
    const response = await getEventCategories();
    eventTypes.value = response.eventCategories.value || [];
  } catch (err) {
    console.error('Failed to load event types:', err);
  }
};


// load event owner
const loadEventOwner = async () => {
  try {
    const response = await getRegisteredUsers();
    eventOwners.value = response.users.value || [];
  } catch (err) {
    console.error('Failed to load event owners:', err);
  }
};

// on mount load both event types and event owners
onMounted(() => {
  loadEventTypes();
  loadEventOwner();
});
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
textarea,
select {
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

.error-border {
  border: 2px solid red;
}

.error-message {
  color: red;
  font-size: 14px;
}
</style>
