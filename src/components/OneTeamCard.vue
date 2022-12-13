<script setup>
import {getAllPokemon} from "@/utils/pokebuildApi";
import heart from '../assets/heart.png';

const allPokemon = await getAllPokemon()

const pokemons = [1,2,3,4,5,6];
let likes = 3;
</script>
<template>
  <div class="row pokemonTeam">
    <div v-for="(poke) in pokemons" class="col">
      <div>
        <div class="row">
          <img :src="allPokemon.at(poke-1).sprite">
          <p>{{allPokemon.at(poke-1).name}}</p>
          <div v-for="(type) in allPokemon.at(poke-1).apiTypes" class="col">
            <img :src="type.image" class="type">
            <p>{{type.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="nrbHearts">
      <p id="likes">{{likes}} <img :src="heart" class="heart"></p>
    </div>
  </div>
</template>

<script>
export default {
  props:['teamPokemon']
}
</script>

<style scoped>
.heart {
  width: 2%;
  height: auto;
}

.nrbHearts{
  font-size: 175%;
}
.pokemonTeam {
  margin: 30px;
  text-align: center;
  background: aquamarine;
}
.type{
  width: 40px;
  height: auto;
}
</style>