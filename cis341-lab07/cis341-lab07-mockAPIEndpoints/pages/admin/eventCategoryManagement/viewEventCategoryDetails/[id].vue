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
    title: 'View User Details'
  });
  
  const route = useRoute();
  const eventCategoriesStore = useEventCategoriesStore();
  const eventCategoryId = route.params.id; 
  
  onMounted(async () => {
    // Ensure the user list is loaded before accessing users
    await eventCategoriesStore.fetchEventCategories();
  });
  
  const eventCategory = computed(() => eventCategoriesStore.eventCategories.find((e) => e.id == eventCategoryId));
  
  
  if (!eventCategory.value) {
    throw createError({ message: 'Event Category not found!' , statusCode: 404})
  }
  
  </script>
  
  <style scoped></style>
  