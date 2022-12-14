<script>
import { getAllPokemon, getAllType } from '../utils/pokebuildApi';
import { getAllCollection, addPokemonToCollection } from '../utils/backend';
import anime from 'animejs';

export default {
  data: () => ({
    loading: true,
    generations: [1,2,3,4,5,6,7,8],
    types: [],
    allPokemons: [],
    myPokemons: [],
    order: 'pokedex',
    cardAnimatedFlipped: [false,false],
  }),
  async created() {
    if(localStorage.token == null || localStorage.pseudo == null){
      this.$router.push({ name: 'login' });
    }

    this.types = await getAllType();
    this.allPokemons = await getAllPokemon();
    this.myPokemons = await getAllCollection(localStorage.pseudo);
    console.log(this.myPokemons);

    this.loading = false;
  },
  methods: {
    setOrder(newOrder){
        this.order = newOrder;
        this.updateOrder(this.order);
    },
    updateOrder(order){
        var dateElement = document.getElementById("pokemonsByDate");
        var pokedexElement = document.getElementById("pokemonsByPokedex");
        if(order == 'date'){
            pokedexElement.hidden = true;
            dateElement.hidden = false;
        }
        else if (order == 'pokedex'){
            dateElement.hidden = true;
            pokedexElement.hidden = false;
        }
    },
    startAnimation(idPokemon){
        var card = document.querySelector(".card");
        if(idPokemon>0){
            document.querySelector(".backImage").setAttribute("src",this.allPokemons[idPokemon-1].image);
            document.getElementById("newPokemonName").innerText = this.allPokemons[idPokemon-1].name;
            document.getElementById("newPokemonTypes").innerHTML = "";
            for(let t in this.allPokemons[idPokemon-1].apiTypes){
                document.getElementById("newPokemonTypes").innerHTML += "<img style=\"width: 20%;display: block; margin-left: auto; margin-right: auto;\" src="+this.allPokemons[idPokemon-1].apiTypes[t].image+">";
            }
        }
        anime({
            targets: card,
            scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 250}],
            rotateY: {value: '+=180', delay: 200},
            easing: 'easeInOutSine',
            duration: 3000,
            complete: () => {
                this.cardAnimatedFlipped[0] = false;
                this.cardAnimatedFlipped[1] = !this.cardAnimatedFlipped[1];
            }
        });
    },
    getNewPokemon(){
        let max = this.allPokemons.length;
        if(this.cardAnimatedFlipped[0])return;
        if(this.cardAnimatedFlipped[1]){
            this.startAnimation();
            this.cardAnimatedFlipped[0] = true;
        }
        else{
            this.cardAnimatedFlipped[0] = true;

        //Get a Random Pokemon
        var idPokemon = Math.floor(Math.random() * max) + 1;
        //go to the first preEvolution
        while(this.allPokemons[idPokemon-1].apiPreEvolution.pokedexIdd > 0) {
            for(let p in this.myPokemons){
                if(p.pokemonId == this.allPokemons[idPokemon-1].apiPreEvolution.pokedexIdd) return;
            }
            idPokemon = this.allPokemons[idPokemon-1].apiPreEvolution.pokedexIdd;
        }
        //If you dont have it, earned it.
        if(!this.hasPokemon(idPokemon)){
            this.catchPokemon(idPokemon);
        } else {
        //check next evolution
        idPokemon = this.checkNextEvolution(idPokemon);
        }
        //start the animation
        this.startAnimation(idPokemon);
        }
    },
    hasPokemon(idPokemon) {
        for(let p in this.myPokemons){
            if(p.pokemonId == idPokemon) return true;
        }
        return false;
    },
    checkNextEvolution(idPok){
        let idPokemon = idPok;
        //if dont have next evo, retry, if it does, go to next evo
        if(!(this.allPokemons[idPokemon-1].apiEvolutions.pokedexId > 0)) this.getNewPokemon();
        else{ idPokemon = this.allPokemons[idPokemon-1].apiEvolutions.pokedexId}
        //if we have evo catch, other whise check next evo
        if(!this.hasPokemon(idPokemon)){
            this.catchPokemon(idPokemon);
            return pokemonId;
        }
        else{return this.checkNextEvolution(idPokemon)}
    },
    async catchPokemon(idPokemon){
        console.log(await addPokemonToCollection(localStorage.pseudo,idPokemon));
    }
  }
}

</script>

<template>
    <div v-if="loading">
        <img class="loadingGif center" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAyOWI4YmQ5LWNiNWEtNDFlNC05YzdlLWVlNTE2ZmFjZTliYlwvZGF5bzNvdy03YWM4NmMzMS04YjJiLTQ4MTAtODlmMi1lNjEzNGNhZjFmMmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ooubhxjHp9PIMhVxvCFHziI6pxDAS8glXPWenUeomWs">
    </div>
    <div v-else>
        <div class="card-container">
            <div class="card" @click="getNewPokemon">
              <div class="front">
              </div>
              <div class="back row">
                <img class="backImage" src="">
                <div id ="newPokemonName"></div>
                <div id ="newPokemonTypes" class="row"></div>
              </div>
            </div>
            
        </div>
        <div class="container filterButtons">
            <div class="row">
                <div class="col">
                    <p id="pokedexFrom">Pokedex de {{myPokemons[0].userId}} : {{myPokemons.length}}/{{allPokemons.length}}</p>
                </div>
                <div class="col">  
                    <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Types
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li v-for="t in types"><a class="dropdown-item" href="#">{{t.name}} <img class="typeImage" :src=t.image></a></li>
                        </ul>
                    </div> 
                </div>
                <div class="col ">  
                    <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle center" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                            Generation
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                            <li v-for="gen in generations"><a class="dropdown-item" href="#">Gen {{gen}}</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col ">  
                    <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle center" type="button" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-expanded="false">
                            Trier
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                            <li><a class="dropdown-item" @click="setOrder('date')">Date d'aquisition</a></li>
                            <li><a class="dropdown-item" @click="setOrder('pokedex')">Ordre Pokedex</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-once>
            <div id="pokemonsByDate" class="row align-items-center" hidden="true">
                <div v-for="poke in myPokemons" class="col" v-bind:id="poke.id">
                     <img class="center" :src="allPokemons[poke.pokemonId-1].sprite">
                </div>
            </div>
            <div id="pokemonsByPokedex" class="row align-items-center">
                <div v-for="poke in [...myPokemons].sort((a,b)=> a.pokemonId > b.pokemonId)" class="col" v-bind:id="poke.id">
                     <img class="center" :src="allPokemons[poke.pokemonId-1].sprite">
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.typeImage{
    width: 15%;
}

.pokeballPic{
    width: 10%;
}

.center{
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.loadingGif{
    width: 20%;
}

#newPokemonName{
    font-size: 30%;
    text-align: center;
}

.card-container
{
    font-family: 'Open Sans', sans serif;
    font-size: 120px;
    font-weight: bold;

    width: 400px;
    height: 300px;
    margin: 80px auto;

    border-radius: 10px;

    perspective: 1400px;
}

.card
{
    position: relative;
    height: 100%;
    border-radius: 10px;
    width: 100%;
    transform-style: preserve-3d;
}

.front,
.back
{
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    backface-visibility: hidden;
}

.front
{
    color: #fff;
    background-image: url("../assets/images/catch2.jpg");
    background-size: cover;
}

.front:hover{
    background-image: url("../assets/images/catch.gif");
}

.backImage{
    width: 50%;
}
.back
{
    position: absolute;
    top: 0;
    left: 0;
    transform: rotateY(180deg);
    color: #d9d9d9; 
    background: rgb(86, 86, 86);
}

#pokedexFrom{
    font-size: 120%;
}
</style>