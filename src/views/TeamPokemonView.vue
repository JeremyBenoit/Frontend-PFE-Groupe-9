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