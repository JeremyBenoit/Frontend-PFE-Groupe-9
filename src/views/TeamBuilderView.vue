<script setup>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import TeamBuilder from '../components/TeamBuilder.vue'
</script>

<template>
    <NavBar />
    <Suspense>
        <template #default>
            <TeamBuilder />
        </template>
        <template #fallback>
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden" id="spinner">Loading...</span>
            </div>
        </template>
    </Suspense>
    
    <Footer />
</template>

<style scoped>
.spinner-border {
    margin-left: 45%;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>