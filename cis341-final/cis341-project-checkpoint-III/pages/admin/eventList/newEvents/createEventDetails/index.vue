<template>
    <div>
      <h1>Create New Event</h1>
      <p v-if="status === 'pending'">Creating new event... We'll redirect you to the event list once we're done.</p>
      <div v-else>
        <form @submit.prevent="createEvent">
          <div>
            <label for="name">Event Name:</label>
            <input id="name" v-model="newEvent.name" type="text" required />
          </div>
          <div>
            <label for="description">Description:</label>
            <textarea id="description" v-model="newEvent.description" required></textarea>
          </div>
          <div>
            <label for="location">Location:</label>
            <input id="location" v-model="newEvent.location" type="text" required />
          </div>
          <div>
            <label for="date">Date:</label>
            <input id="date" v-model="newEvent.date" type="date" :min="today" required />
          </div>
          <div>
            <label for="price">Price:</label>
            <input id="price" v-model="newEvent.price" type="number" required />
          </div>
          <div>
            <label for="attendees">Attendees:</label>
            <input id="attendees" v-model="newEvent.attendees" type="number" required />
          </div>
          <div>
            <label for="eventType">Event Type:</label>
            <select id="eventType" v-model="newEvent.type_id" required>
              <option v-for="type in eventTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
            </select>
          </div>
          <div>
            <label for="eventOwner">Event Owner:</label>
            <select id="eventOwner" v-model="newEvent.owner_id" required>
              <option v-for="type in eventOwners" :key="type.id" :value="type.id">{{ type.full_name }}</option>
            </select>
          </div>
          <button type="submit" @click="goBackToEventList">Save</button>
        </form>
      </div>
  
      <p v-if="error">{{ error }}</p>
  
      <button @click="goBackToEventList" style="margin-top: 10px;">Back to Event List</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { generateUniqueId } from "./utils/generateUniqueId";
  
  useHead({
    title: 'Create New Event',
  });
  
  const router = useRouter();
  const { fetchWithPost, getEventCategories, getRegisteredUsers } = useApiService(); 
  
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
  
  const today = new Date().toISOString().split('T')[0];
  const error = ref(null);
  const status = ref(null);
  const eventTypes = ref([]);
  const eventOwners = ref([]);
  
  const createEvent = async () => {
    try {
      status.value = 'pending';
      newEvent.value.id = generateUniqueId();
  
      const response = await fetchWithPost('/api/eventList/eventCreation', newEvent.value);
      if (response.error) {
        error.value = 'Failed to create event. Please try again.';
        console.error(response.error);
      } else {
        alert('Event created successfully!');
        router.push('/admin/eventList/newEvents');
      }
    } catch (err) {
      error.value = 'An unexpected error occurred.';
      console.error(err);
    } finally {
      status.value = null;
    }
  };
  
  const goBackToEventList = () => {
    router.push('/admin/eventList/newEvents');
  };
  
  const loadEventTypes = async () => {
    try {
      const response = await getEventCategories();
      console.log("EVENT CATEGORIES LIST: ", response.eventCategories.value)
      eventTypes.value = response.eventCategories.value || [];
    } catch (err) {
      console.error('Failed to load event types:', err);
    }
  };

  const loadEventOwner = async () => {
    try {
      const response = await getRegisteredUsers();
      console.log("EVENT OWNER LIST: ", response.users.value)
      eventOwners.value =  response.users.value || [];
    } catch (err) {
      console.error('Failed to load event types:', err);
    }
  };
  
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
  </style>
  