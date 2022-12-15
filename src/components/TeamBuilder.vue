<script>
import pokeball from '../assets/pokeball.png';
import { getAllPokemon, getDefensiveCoverage, getPokemonsFromGen, getPokemonsFromType, getAllType } from '../utils/pokebuildApi';
import { createTeam } from '../utils/backendRequests';

export default {
  components: {
  },
  data: () => ({
    loading: [true,"Initialisation..."],
    generations: [1,2,3,4,5,6,7,8],
    types: [],
    allPokemons: [],
    filterAxises: ["gen", "types"],
    pokemonTeamPointer: -1,
    pokemonTeam: [ -1,-1,-1,-1,-1,-1 ],
    pokeball: pokeball,
  }),
  async created() {
    this.loading[1] = "Chargement des types en cours...";
    this.types = await getAllType();
    this.loading[1] = "Chargement des Pokemons en cours...";
    this.allPokemons = await getAllPokemon();
    this.loading[0] = false;
  },
  methods: {
    addPokemon(idPokemon) {
        if(this.pokemonTeam[this.pokemonTeam.length-1]!=-1){
            return;
        }
        this.pokemonTeamPointer++;
        this.pokemonTeam[this.pokemonTeamPointer] = idPokemon;
    },
    removePokemon(indexSlot) {    
        for (let index = indexSlot; index < this.pokemonTeamPointer; index++) {
            this.pokemonTeam[index] = this.pokemonTeam[index+1];
        }
        this.pokemonTeam[this.pokemonTeamPointer] = -1;
        this.pokemonTeamPointer--;
    },
    async displayDefensiveCoverage() {
        let defensifeCoverage = await getDefensiveCoverage(this.pokemonTeam);
        let defensifeCoverageHtml = document.getElementById("defensiveCoverage");

        let tempHtml = ``;
        defensifeCoverage.forEach(defenseType => {
            tempHtml += `<div class="${defenseType.result}">${defenseType.name} : ${defenseType.message}</div>`
        });

        defensifeCoverageHtml.innerHTML = tempHtml;
    },
    async filterPokemon(filterAxis, filter){
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
                this.addPokemon(pokemon.id);    
            });
        })
    },
    resetFilters() {
        let filteredPokemonHtml = document.getElementById("filteredPokemon");
        filteredPokemonHtml.innerHTML = ``;

        let allPokemonHtml = document.getElementById("allPokemon");
        allPokemonHtml.hidden = false;
    },
    async createTeamHandler(e) {
        const form = e.target;
        if(this.pokemonTeam[this.pokemonTeam.length-1]!=-1){
            this.loading[0] = true;
            this.loading[1] = "Equipe en cours de création";
            const res = await createTeam(form.teamName.value, localStorage.pseudo, this.pokemonTeam, localStorage.token);
            this.loading[0] = false;
        }
    }
  }
}
</script>

<template>
    <div v-if="loading[0]">
        <img class="loadingGif" src="../assets/images/loading.gif">
        <h3 class="loadingMessage">{{loading[1]}}</h3>
    </div>  
    <div v-else>
        <div class="row pokemonTeam">
            <div v-for="index in pokemonTeam.length" class="col">
                <div v-if="pokemonTeam[index-1] == -1">
                    <div v-bind:id="'PokemonSlot'+index">
                        <img :src="pokeball" class="teamPic">
                    </div>
                </div>
                <div v-else>
                    <div>
                        <img :src="allPokemons[pokemonTeam[index-1]-1].sprite" @click="removePokemon(index)" class="teamPic">
                    </div>
                </div>
            </div>
        </div>
        <div class="container filterButtons">
            <div class="row">
                <div class="col">
                    <button class="btn btn-primary" type="button" v-on:click="resetFilters()">Voir tout</button>
                </div>
                <div class="col">  
                    <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Types
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li v-for="t in types">
                                <a class="dropdown-item" v-on:click="filterPokemon(filterAxises[1], t.name)"> {{ t.name }} <img class="typeImage" :src="t.image" ></a>
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
                            <li v-for="n in generations">
                                <a class="dropdown-item" v-on:click="filterPokemon(filterAxises[0], n)">gen {{ n }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="strengthWeakness col">
                    <button class="btn btn-primary" v-on:click="displayDefensiveCoverage()"> Vérifier forces et faiblesses </button>
                </div>
                <div class="col row" v-if="pokemonTeam[pokemonTeam.length-1]!=-1">
                    <form id="createTeamForm" v-on:submit.prevent="createTeamHandler">
                        <input type="text" placeholder="Nom d'équipe" name="teamName" required class="col">
                        <button id="createTeamButton" type="submit" class="btn btn-primary col">Créer l'équipe</button>
                    </form>
                </div>
                <div id="defensiveCoverage"></div>
            </div>
        </div>
        <div id="allPokemon">
            <div class="row">
                <div v-for="poke in this.allPokemons" class="col" v-bind:id="poke.id">
                    <img :src="poke.sprite" @click="addPokemon(poke.id)">
                </div>
            </div>
        </div>
        <div id="filteredPokemon"></div>
    </div>
</template>

<style>
.teamPic {
    width: 50%;
    height: auto;
}

.pokemonTeam {
    margin-top: 10px;
    margin-bottom: 10px;
}

.filterButtons{
    margin-top: 5px;
    margin-bottom: 5px;
}

.loadingGif, .loadingMessage{
    width: 20%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    font-style: oblique;
    text-align: center;
}

.typeImage{
    width: 15%;
}
</style>
