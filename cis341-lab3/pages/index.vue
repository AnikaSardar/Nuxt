<template>
    <div>
        <header>
            <nav>
                <NuxtLink to="/">Nuxt Dojo</NuxtLink>
                <ul>
                    <!-- Using NuxtLink over anchor tags:
                        1. To avoid fresh req to server for 'about' route and server pre-rendering to browser
                        2. Save time: Instead make NUXT intercept req to server and swap components for the pages
                        3. Get automatically active classes to style them differently-->
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/about">About</NuxtLink></li>
                    <li><NuxtLink to="/products">Products</NuxtLink></li>
                </ul>
            </nav>
        </header>
        <!-- Sends a fresh request to server as seen via Networks tab  -->
        <!-- <a href="/products">Normal anchor tag to Products</a> -->
        <h2>Welcome Home!</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Minima quae doloribus repudiandae quam beatae ipsa incidunt molestiae quisquam perspiciatis sunt.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis incidunt ullam et, ad suscipit fugiat beatae molestiae culpa rerum? Aspernatur?</p>
        
    </div>
</template>

<script setup>

</script>

<style scoped>
h2 {
    margin-bottom:20px;
    font-size:36px;
}
p{
    margin: 20px 0;
}
</style>