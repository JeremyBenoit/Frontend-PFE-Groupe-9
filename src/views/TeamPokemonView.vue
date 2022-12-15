<script setup>
import NavBar from '../components/NavBar.vue'
import TeamPokemon from '../components/TeamPokemon.vue'
</script>

<template>
  <NavBar />
  <TeamPokemon :teamId="$route.params.id"/>
</template>