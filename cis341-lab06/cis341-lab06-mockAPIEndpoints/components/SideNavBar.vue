<template>
    <div>
        <!-- TODO: ADD CSS/USE BOOTSTRAP, for toggle-able hamburger menu-->
        <aside class="sidebar">
            <nav>
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>    
                    <li><NuxtLink to="/newEvents">New Events</NuxtLink></li>    
                    <li><NuxtLink to="/savedEvents">Saved Events</NuxtLink></li>    
                    <li><NuxtLink to="/pastEvents">Past Events</NuxtLink></li>    
                    <li><NuxtLink to="/inbox">Inbox</NuxtLink></li>  
                </ul>
            </nav>
        </aside>
    </div>
</template>

<script setup>
</script>
<style>
@import url('~/assets/css/side-navbar.css');
</style>