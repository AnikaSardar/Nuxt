<template>
    <div>
        <header>
            <nav>
                <NuxtLink to="/">Nuxt Dojo</NuxtLink>
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/about">About</NuxtLink></li>
                    <li><NuxtLink to="/products">Products</NuxtLink></li>
                </ul>
            </nav>
        </header>

        <h2>About</h2>
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