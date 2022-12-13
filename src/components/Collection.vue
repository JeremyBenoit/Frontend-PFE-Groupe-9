<script setup>
import { getAllPokemon, getDefensiveCoverage, getAllType } from '../utils/pokebuildApi';

const generations = [1,2,3,4,5,6,7,8,9];
const types = await getAllType();
const allPoke = await getAllPokemon();

</script>

<template>
    <div class="container filterButtons">
        <div class="row">
            <div class="col">  
                <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Types
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li v-for="t in types"><a class="dropdown-item" href="#">{{t.name}} <img class="typeImage" :src=t.image></a></li>
                    </ul>
                </div> 
            </div>
            <div class="col">  
                <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Generation
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li v-for="gen in generations"><a class="dropdown-item" href="#">Gen {{gen}}</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-8"></div>
        </div>
        <div class="strengthWeakness">
            <button class="btn btn-primary" v-on:click="displayDefensiveCoverage()"> Vérifier forces et faiblesses </button>
            <div id="defensiveCoverage"></div>
        </div>
    </div>
    <div class="row" v-once>
        <div v-for="poke in allPoke" class="col" v-bind:id="poke.id">
             <img :src="poke.sprite" v-on:click="addPokemon(poke.id)">
        </div>
    </div>
</template>

<style>
.typeImage{
    width: 15%;
}
</style>