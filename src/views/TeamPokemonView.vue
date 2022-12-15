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
      <div role="status">
        <img class="loadingGif center" src="../assets/images/loading.gif">
      </div>
    </template>
  </Suspense>

  <Footer />
</template>

<style scoped>
.center{
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.loadingGif{
  width: 20%;
}
</style>