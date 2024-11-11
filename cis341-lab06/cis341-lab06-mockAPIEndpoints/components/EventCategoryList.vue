<template>
    <div>
        <h1>Add/Modify Category List</h1>
        <form @submit.prevent="createEventCategory">
            <div>
                <input v-model="newEventCategory.name" placeholder="Name" required />
            </div>
            <button type="submit">Add/Edit Event Category</button>
        </form>

        <div v-if="eventCategoriesStore.error" class="error-message">
            <p>{{ eventCategoriesStore.error }}</p>
        </div>

        <h1>Event Category List</h1>
        <ul>
            <li v-for="eventCategory in eventCategoriesStore.eventCategories" :key="eventCategory.id">
                <NuxtLink :to="`/admin/eventCategoryManagement/viewEventCategoryDetails/${eventCategory.id}`"> Name: {{
                    eventCategory.name }} | Id: {{ eventCategory.id }} |</NuxtLink>
                <button @click="removeEventCategory(eventCategory.id)">Delete</button> |
                <button @click="editEventCategory(eventCategory)">Edit</button> |
            </li>
        </ul>
    </div>

</template>

<script setup>
// useStore from stores/eventCategories.js
const eventCategoriesStore = useEventCategoriesStore();
// set name to empty
const newEventCategory = ref({
    name: ''
});
const eventCategories = ref(null);
const modified = ref(false);

onMounted(async () => {
    // Get eventCategories from store --> will trigger a fetch from external API.
    await eventCategoriesStore.fetchEventCategories();
    eventCategories.value = eventCategoriesStore.eventCategories;
});

// Event handlers -- call appropriate action from Pinia store.
const createEventCategory = async () => {
    if (modified.value) {
        await eventCategoriesStore.updateEventCategory({ ...newEventCategory.value });
        modified.value = !modified.value;
    } else {
        await eventCategoriesStore.addEventCategory({ ...newEventCategory.value });
    }
    newEventCategory.value.name = '';
};

const removeEventCategory = async (eventCategoryId) => {
    await eventCategoriesStore.deleteEventCategory(eventCategoryId);
    // For some reason the eventCategories ref does not pick up the changes
    // to the store so we're forcing the assignment here.
    eventCategories.value = eventCategoriesStore.eventCategories;
};

const editEventCategory = (eventCategory) => {
    newEventCategory.value = { ...eventCategory };
    modified.value = true;
};
</script>

<style scoped>
@import url("~/assets/css/form.css");
</style>
