<template>
    <div>
  
      <h1>View Event Category Details</h1>
      <p>Name: {{ eventCategory.name }}</p>
      <p>Id: {{ eventCategory.id }}</p>
  
      <NuxtLink to="/admin/eventCategoryManagement">Back to Event Category List</NuxtLink>

    </div>
  
  </template>
  
  <script setup>
  
  useHead({
    title: 'View Event Category Details'
  });
  
  const { getEventCategoryDetails } = useApiService();
  const route = useRoute();

  const {eventCategory, error, pending } = await getEventCategoryDetails(route.params.id);

  </script>
  
  <style scoped></style>
  