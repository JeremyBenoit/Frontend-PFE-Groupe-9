<script>
import anime from 'animejs';

export default {
  props: ['myPokemons','allPokemons'],
  methods: {
    animePokemon(event){
      anime({
        targets: event.target,
        translateX: [Math.floor(Math.random()*10),-Math.floor(Math.random()*10),Math.floor(Math.random()*10),-Math.floor(Math.random()*10),0],
        translateY: [Math.floor(Math.random()*10),-Math.floor(Math.random()*10),Math.floor(Math.random()*10),-Math.floor(Math.random()*10),0],
        easing: 'easeInOutSine',
        duration: 500,
      });
    }
  }
}
</script>
<template>
  <div class="container">
    <div id="pokemonsByDate" class="row row-cols-auto">
      <div v-for="poke in myPokemons" class="col" v-bind:id="poke.id">
        <img class="center" :src="allPokemons[poke.pokemonId-1].sprite" @click="animePokemon($event)">
      </div>
    </div>
  </div>
</template>