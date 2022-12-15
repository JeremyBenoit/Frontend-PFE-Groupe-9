<script setup>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import TeamPokemon from '../components/TeamPokemon.vue'
</script>
<template>
  <NavBar />
  <TeamPokemon :teamId="$route.params.id"/>
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