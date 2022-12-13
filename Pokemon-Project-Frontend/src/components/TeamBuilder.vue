<script setup>
import pokeball from '../assets/pokeball.png'
import { getAllPokemon, getDefensiveCoverage, getPokemonsFromGen, getPokemonsFromType, getAllType } from '../utils/pokebuildApi'

let allPoke;
let allType;
allPoke = await getAllPokemon();
allType = await getAllType();


let numberGeneration = 8;
let filterAxises = ["gen", "types"];

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
}

const removePokemon = (indexPoke) => {
    let indexPokemonToRemove = parseInt(indexPoke[4])
    if(lastPokePointer==-1) {
        return;
    }
    
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
}

const displayDefensiveCoverage = async () => {
    let defensifeCoverage = await getDefensiveCoverage(teamPoke);
    let defensifeCoverageHtml = document.getElementById("defensiveCoverage");

    let tempHtml = ``;
    defensifeCoverage.forEach(defenseType => {
        tempHtml += `<div class="${defenseType.result}">${defenseType.name} : ${defenseType.message}</div>`
    });

    defensifeCoverageHtml.innerHTML = tempHtml;

}

const filterPokemon = async (filterAxis, filter) => {
    let allPokemonHtml = document.getElementById("allPokemon");
    allPokemonHtml.hidden = true;

    let filteredPokemons;

    if (filterAxis == "gen"){
        filteredPokemons = await getPokemonsFromGen(filter);
    } else {
        filteredPokemons = await getPokemonsFromType(filter);
    }
    
    let tempHtml= `<div class="row">`
    filteredPokemons.forEach(pokemon => {
        tempHtml += `<div class="col"><img id="filteredPoke${pokemon.id}" src=${pokemon.sprite}> </div>`
    });
    tempHtml += `</div>`
    
    let filteredPokemonHtml = document.getElementById("filteredPokemon");
    filteredPokemonHtml.innerHTML = tempHtml;
    
    filteredPokemons.forEach(pokemon => {
        let tempFilteredPokemon = document.getElementById("filteredPoke"+pokemon.id);
        tempFilteredPokemon.addEventListener("click", () => {
            addPokemon(pokemon.id);
        });
    })
}

const resetFilters = () => {
    let filteredPokemonHtml = document.getElementById("filteredPokemon");
    filteredPokemonHtml.innerHTML = ``;

    let allPokemonHtml = document.getElementById("allPokemon");
    allPokemonHtml.hidden = false;
}
</script>

<template>
    <div class="row pokemonTeam">
        <div v-for="(poke, index) in teamPoke" class="col">
            <div v-if="poke == -1">
                <div v-bind:id="'Poke'+index" v-on:click="removePokemon('Poke'+index)"> <img :src="pokeball" class="pokeballPic"> </div>
            </div>
        </div>
    </div>
    <div class="container filterButtons">
        <div class="row">
            <div class="col">  
                <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Types
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li v-for="types in allType">
                            <a class="dropdown-item" v-on:click="filterPokemon(filterAxises[1], types.name)"> {{ types.name }} </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col">  
                <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Generation
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li v-for="n in numberGeneration">
                            <a class="dropdown-item" v-on:click="filterPokemon(filterAxises[0], n)">gen {{ n }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-5"></div>
            <div class="col-3">
                <button class="btn btn-primary" type="button" v-on:click="resetFilters()">Voir tous les pokemons</button>
            </div>
        </div>
        <div class="strengthWeakness">
            <button class="btn btn-primary" v-on:click="displayDefensiveCoverage()"> Vérifier forces et faiblesses </button>
            <div id="defensiveCoverage"></div>
        </div>
    </div>
    <div id="allPokemon">
        <div class="row">
            <div v-for="poke in allPoke" class="col" v-bind:id="poke.id">
                <img :src="poke.sprite" v-on:click="addPokemon(poke.id)">
            </div>
        </div>
    </div>
    <div id="filteredPokemon"></div>
</template>

<style>
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