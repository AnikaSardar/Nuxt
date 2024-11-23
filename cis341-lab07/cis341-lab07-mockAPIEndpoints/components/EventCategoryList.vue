<template>
    <div>
        <h1>Event Category List</h1>
        <ul>
            <li v-for="eventCategory in eventCategories" :key="eventCategory.id">
                <NuxtLink :to="`/admin/eventCategoryManagement/viewEventCategoryDetails/${eventCategory.id}`"> Name: {{
                    eventCategory.name }} | Id: {{ eventCategory.id }} |</NuxtLink>
            </li>
        </ul>
        <p v-if="error">{{ error.message }}</p>
        <p v-if="pending">Loading...</p>
    </div>

</template>

<script setup>
import { useApiService } from '~/composables/useApiService';

const { getEventCategories } = useApiService();

const { eventCategories, error, pending } = await getEventCategories();

</script>

<style scoped>
@import url("~/assets/css/form.css");
</style>
