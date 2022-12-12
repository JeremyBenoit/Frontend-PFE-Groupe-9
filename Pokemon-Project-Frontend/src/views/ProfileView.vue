<script setup>
  import Footer from "../components/Footer.vue";
  import NavBar from "../components/NavBar.vue";
  import Profile from "../components/Profile.vue";
</script>

<template>
  <NavBar />
  <Suspense>
    <template #default>
      <Profile />
    </template>
    <template #fallback>
      <div>Loading ...</div>
    </template>
  </Suspense>
  <Footer />
</template>
