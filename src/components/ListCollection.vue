<script>
export default {
  props: ['myPokemons','allPokemons']
}
</script>
<template>
  <div class="container">
    <div id="pokemonsByDate" class="row row-cols-auto">
      <div v-for="poke in myPokemons" class="col" v-bind:id="poke.id">
        <img class="center" :src="allPokemons[poke.pokemonId-1].sprite">
      </div>
    </div>
  </div>
</template>