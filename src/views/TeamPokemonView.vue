<script setup>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import TeamPokemon from '../components/TeamPokemon.vue'
</script>
<template>
  <NavBar />
  <Suspense>
    <template #default>
      <TeamPokemon :teamId="$route.params.id"/>
    </template>
    <template #fallback>
      <div class="spinner-border text-primary" role="status">
        <img class="loadingGif" src="../assets/images/loading.gif">
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