<template>
  <div>
    <h1>Edit Event Category Details</h1>
    <p v-if="status === 'pending'">Loading category details...</p>
    <div v-else>
      <form @submit.prevent="saveCategoryDetails">
        <div>
          <label for="name">Category Name:</label>
          <input id="name" v-model="editableCategory.name" type="text" />
          <!-- Display validation error if any -->
          <p v-if="validationError" style="color: red;">{{ validationError }}</p>
        </div>
        <button type="submit" @click="goBackToCategoryList">Update Category</button>
      </form>
    </div>

    <p v-if="error">{{ error.message }}</p>
    <button @click="goBackToCategoryList" style="margin-top: 10px;">Back to Category List</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { z } from 'zod';
const { fetchWithPatch } = useApiService();

useHead({
  title: 'Edit Event Category Details',
});

const route = useRoute();
const router = useRouter();

// Fetch category data
const { data: category, error, pending: status } = await useFetch(`/api/eventCategories/${route.params.id}`);

// Editable category object
const editableCategory = ref({
  name: category.value?.name || '',
});

// Validation error state
const validationError = ref(null);

// Zod schema for category validation
const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100, 'Category name should not exceed 100 characters'),
});

// Function to save category details
const saveCategoryDetails = async () => {
  try {
    // Clear previous validation errors
    validationError.value = null;

    // Validate the category data using Zod schema
    categorySchema.parse(editableCategory.value);  // Throws if invalid

    const updatedCategory = {
      ...editableCategory.value,
    };

    const endpoint = `/api/eventCategories/${route.params.id}`;
    const response = await fetchWithPatch(endpoint, updatedCategory);

    if (response.error) {
      alert('Failed to update category details. Please try again.');
    } else {
      alert('Category details updated successfully!');
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Handle validation errors from Zod
      validationError.value = err.errors.map(e => e.message).join(' | ');
    } else {
      alert('An unexpected error occurred.');
      console.error(err);
    }
  }
};

// Function to navigate back to the category list
const goBackToCategoryList = () => {
  router.push('/admin/eventCategoryManagement').then(() => {
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

  p {
    font-size: 14px;
    color: red;
  }
</style>
