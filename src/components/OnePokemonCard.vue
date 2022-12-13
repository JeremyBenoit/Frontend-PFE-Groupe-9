<template>
  <div class="row OnePoke">
    <div>
      <p>{{pokemon.name}}  pokedex n°{{pokemon.pokedexId}}</p>
    </div>
    <img :src="pokemon.sprite" @mousedown="display=!display"/>
    <div v-for="(type) in pokemon.apiTypes" class="col">
      <img :src="type.image" class="type">
      <p>{{type.name}}</p>
    </div>
    <div v-for="(n,stat) in pokemon.stats">
      <p id="{{pokemon.id}}" v-show="display">{{stat}} : {{n}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props:['pokemon'],
  data(){
    return {display:false}
  }
}
</script>

<style scoped>
.type{
  width: 40px;
  height: auto;
}
</style>