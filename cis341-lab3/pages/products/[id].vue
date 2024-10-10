<template>
    <div>
        <!-- Route id being passed as a param-->
        <p>Product details for {{ id }}</p> 
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quia maiores sed est veritatis labore laudantium nisi repellendus ut debitis quasi beatae minima sunt, quo laborum eos laboriosam ipsa neque.</p>
    </div>
</template>

<script setup>
    const{ id } = useRoute().params
</script>

<style lang="scss" scoped>

</style>