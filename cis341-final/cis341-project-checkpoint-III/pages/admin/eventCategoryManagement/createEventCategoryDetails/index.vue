<template>
  <div>
    <h1>Create New Event Category</h1>
    <p v-if="status === 'pending'">Creating new event category... We'll redirect you to the event categories list once we're done.</p>
    <div v-else>
      <form @submit.prevent="createEventCategory">
        <div>
          <label for="categoryName">Category Name:</label>
          <input id="categoryName" v-model="newCategory.name" type="text" />
          <!-- Display validation error if any -->
          <p v-if="validationError" style="color: red;">{{ validationError }}</p>
        </div>
        <button type="submit" :disabled="status === 'pending'">Save</button>
      </form>
    </div>
  
    <p v-if="error">{{ error }}</p>
  
    <button @click="goBackToCategoryList" style="margin-top: 10px;">Back to Event Categories</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { z } from 'zod';
import { generateUniqueId } from "./utils/generateUniqueId";

useHead({
  title: 'Create New Event Category',
});

const router = useRouter();
const { fetchWithPost } = useApiService();

// Define Zod schema for validating new category
const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(50, 'Category name should not exceed 100 characters'),
});

const newCategory = ref({
  id: '',
  name: '',
});

const error = ref(null);
const status = ref(null);
const validationError = ref(null);

const createEventCategory = async () => {
  // Validate the form data using Zod schema
  try {
    validationError.value = null; // Reset validation error

    // Validate the category data
    categorySchema.parse(newCategory.value);  // Throws if invalid
    
    status.value = 'pending';
    newCategory.value.id = generateUniqueId();

    const response = await fetchWithPost('/api/eventCategories/eventCategoriesCreation', newCategory.value);
    if (response.error) {
      error.value = 'Failed to create event category. Please try again.';
      console.error(response.error);
    } else {
      alert('Event category created successfully!');
      router.push('/admin/eventCategoryManagement');
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Handle validation errors from Zod
      validationError.value = err.errors.map(e => e.message).join(' | '); // Show validation error
      console.error('Validation errors:', err.errors);
    } else {
      error.value = 'An unexpected error occurred.';
      console.error(err);
    }
  } finally {
    status.value = null;
  }
};

const goBackToCategoryList = () => {
  router.push('/admin/eventCategoryManagement');
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

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
