<template>
    <div>
        <aside class="sidebar">
            <nav>
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>    
                    <li><NuxtLink to="/newEvents">New Events</NuxtLink></li>      
                    <li><NuxtLink to="/pastEvents">Past Events</NuxtLink></li>     
                </ul>
            </nav>
        </aside>
    </div>
</template>

<script setup>
</script>
<style>
@import url("~/assets/css/side-navbar.css");
</style>