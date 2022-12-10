<script setup>
import pokeball from '../assets/pokeball.png'

import { getAllPokemon } from '../utils/pokebuildApi'

let allPoke;

allPoke = await getAllPokemon();
console.log(allPoke);

let teamPoke = [ '-1','-1','-1','-1','-1','-1' ]
</script>

<template #default>
    <div class="row pokemonTeam">
        <div v-for="(poke, index) in teamPoke" class="col">
            <div v-if="poke == '-1'">
                <div v-bind:id="index"> <img :src="pokeball" class="pokeballPic"> </div>
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