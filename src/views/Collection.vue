<script setup>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import Collection from '../components/Collection.vue'
</script>

<template>
    <NavBar />
    <Suspense>
        <template #default>
            <Collection />
        </template>
        <template #fallback>
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden" id="spinner">Loading...</span>
            </div>
        </template>
    </Suspense>
    <Footer />
</template>