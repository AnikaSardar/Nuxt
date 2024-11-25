<!-- 
<template>
    <div>
         <p>Event List</p>
    </div>
</template>

<script setup>

</script>

<style scoped></style> -->
<template>
    <div>
      <h1>Available Events</h1>
      <p v-if="status === 'pending'">Loading...</p>
      <div v-else>
        <ul>
          <li v-for="event in events" :key="event.id">
            <NuxtLink :to="`/admin/eventList/viewEventDetails/${event.id}`">
              {{ event.name }} - {{ event.attendees }} attendees
            </NuxtLink>
          </li>
        </ul>
      </div>
      <p v-if="error">{{ error.statusMessage }}</p>
    </div>
  </template>
  
  <script setup>
  const { getEvents } = useApiService();
  const { events, error, status } = await getEvents();
  </script>
  
  