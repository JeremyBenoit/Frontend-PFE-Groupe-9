<script setup>
import pokeball from '../assets/pokeball.png'
import { getAllPokemons } from '../utils/pokebuildApi'

let componentKey = 0;

let allPoke;
allPoke = await getAllPokemons();

let lastPokePointer = -1;
let teamPoke = [ -1,-1,-1,-1,-1,-1 ];
const addPokemon = (idPokemon) => {
    if(lastPokePointer == 5){
        console.log("team complete");
        return;
    }
    lastPokePointer++;
    teamPoke[lastPokePointer] = idPokemon;
    let htmlPokemon = document.getElementById("Poke"+lastPokePointer);
    
    let imagePokemon = document.getElementById(idPokemon);
    htmlPokemon.innerHTML = imagePokemon.innerHTML;

    console.log(teamPoke);
}

const removePokemon = (indexPoke) => {
    let indexPokemonToRemove = parseInt(indexPoke[4])
    if(lastPokePointer==-1) {
        console.log("team vide : rien à remove");
        return;
    }

    console.log("index poke to be removed : " + indexPoke);
    
    console.log("last poke removed : " + indexPokemonToRemove == lastPokePointer);
    
    for (let index = indexPokemonToRemove; index < lastPokePointer; index++) {
        teamPoke[index] = teamPoke[index+1];

        let pokemonTempHtml = document.getElementById('Poke'+index);
        let pokemonNextHtml = document.getElementById('Poke'+(index+1));
        pokemonTempHtml.innerHTML = pokemonNextHtml.innerHTML;
    }
    

    teamPoke[lastPokePointer] = -1;
    let lastPokemonHtml = document.getElementById('Poke'+lastPokePointer);
    lastPokemonHtml.innerHTML = `<img src="${pokeball}" class="pokeballPic">`

    lastPokePointer--;
    console.log(teamPoke);
}

</script>

<template>
    <div class="row pokemonTeam">
        <div v-for="(poke, index) in teamPoke" class="col">
            <div v-if="poke == -1">
                <div v-bind:id="'Poke'+index" v-on:click="removePokemon('Poke'+index)"> <img :src="pokeball" class="pokeballPic"> </div>
            </div>
            <div v-else>y'a un probleme xd {{poke}}</div>
        </div>
    </div>
    <div class="strengthWeakness">
        force et faiblesse à faire
    </div>
    <div class="container filterButtons">
        <div class="row">
            <div class="col">  
                <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Types
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">type 1</a></li>
                        <li><a class="dropdown-item" href="#">type 2</a></li>
                        <li><a class="dropdown-item" href="#">type 3</a></li>
                    </ul>
                </div>
            </div>
            <div class="col">  
                <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Generation
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">gen 1</a></li>
                        <li><a class="dropdown-item" href="#">gen 2</a></li>
                        <li><a class="dropdown-item" href="#">gen 3</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-8"></div>
        </div>
    </div>
    <div class="row" v-once>
        <div v-for="poke in allPoke" class="col" v-bind:id="poke.id">
             <img :src="poke.sprite" v-on:click="addPokemon(poke.id)">
        </div>
    </div>
</template>

<style scoped>
.pokeballPic {
    width: 50%;
    height: auto;
}

.pokemonTeam {
    margin-top: 10px;
    margin-bottom: 10px;
}

.strengthWeakness{
    margin-top: 5px;
    margin-bottom: 5px;
}

.filterButtons{
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>