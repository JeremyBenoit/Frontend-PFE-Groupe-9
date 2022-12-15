<script setup>
import {getAllPokemon} from "@/utils/pokebuildApi";
import heart from '../assets/heart.png';
import OnePokemonCard from "@/components/OnePokemonCard.vue";
import {getOneTeamById} from "@/utils/teamsAPI";

const allPokemon = await getAllPokemon()
let likes = 3;
</script>
<template>
  <div class="row pokemonTeam">
    <div v-for="(poke) in team" class="col">
      <div>
        <OnePokemonCard :pokemon="allPokemon.at(poke-1)" />
      </div>
    </div>
    <div class="nrbHearts">
      <p id="likes">{{likes}} <img :src="heart" class="heart" alt="heart"></p>
    </div>
  </div>
</template>

<script>
export default {
  props:['team']
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
}
</style>