<template>
    <div>
        <div>
            <h1>User List</h1>
            <ul>
                <li v-for="user in users" :key="user.id">
                    <NuxtLink :to="`/admin/userManagement/viewUserDetails/${user.id}`"> Name: {{ user.name }} |
                        Username: {{
                            user.username }} | Id: {{ user.id }} | Role: {{ user.role }} |</NuxtLink>
                </li>

            </ul>
            <p v-if="error">{{ error.message }}</p>
            <p v-if="pending">Loading...</p>
        </div>
    </div>

</template>

<script setup>
import { useApiService } from '~/composables/useApiService';

const { getUsers } = useApiService();

const { users, error, pending } = await getUsers();

</script>

<style scoped>
@import url("~/assets/css/form.css");
</style>
