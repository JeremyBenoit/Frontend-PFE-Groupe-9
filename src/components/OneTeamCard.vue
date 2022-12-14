<script setup>
import {getAllPokemon} from "@/utils/pokebuildApi";
import heart from '../assets/heart.png';
import OnePokemonCard from "@/components/OnePokemonCard.vue";
import {getOneTeamById} from "@/utils/teamsAPI";

let team;
const t = (teamId) => {
  team = getOneTeamById(teamId)
}
const allPokemon = await getAllPokemon()

const pokemons = [1,2,3,4,5,6];
let likes = 3;
</script>
<template>
  {{t(teamId)}}
  <div class="row pokemonTeam">
    <div v-for="(poke) in pokemons" class="col">
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
  props:['teamId']
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