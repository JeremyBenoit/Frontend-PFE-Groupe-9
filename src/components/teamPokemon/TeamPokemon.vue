<script setup>
import './teamPokemon.css';

import pokeball from '../../assets/pokeball.png'

import { getAllPokemon } from '@/utils/pokebuildApi'
import {getTeam} from "@/utils/teamsAPI";
import heart from '../../assets/heart.png';


const allPokemon = await getAllPokemon();
console.log(allPokemon.at(0))

const team = await getTeam();

const name = "test";
const pokemons = [1,2,3,4,5,6];
const comments = ['test','test'];
let likes = 3;

const addLikes = () => {
  likes++;
  document.getElementById("likes").innerHTML = likes;
}
</script>


<template>
  <h3>Team {{name}}</h3>
  <div class="row pokemonTeam">
    <div v-for="(poke) in pokemons" class="col">
      <div>
        <div v-if="poke === -1">
          <img :src="pokeball" class="pokeballPic">
        </div>
        <div v-else class="row">
          <img :src="allPokemon.at(poke-1).sprite">
          <p>{{allPokemon.at(poke-1).name}}</p>
          <div v-for="(type) in allPokemon.at(poke-1).apiTypes" class="col">
            <img :src="type.image" class="type">
            <p>{{type.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="nrbHearts" v-on:click="addLikes()">
      <p id="likes">{{likes}} <img :src="heart" class="heart"></p>
    </div>
  </div>
  <div class="strengthWeakness">
    <h3>Force et faiblesse</h3>
    force et faiblesse à faire
  </div>
  <div class="comments">
    <h3>Comments</h3>
    <div v-for="(comment) in comments" class="row">
      <div>
        {{comment}}
      </div>
    </div>
  </div>
</template>