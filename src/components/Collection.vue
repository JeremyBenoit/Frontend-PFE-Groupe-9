<script>
import { getAllPokemon, getAllType } from '@/utils/pokebuildApi';
import { getAllCollection, addPokemonToCollection } from '@/utils/backendRequests';
import anime from 'animejs';
import PokemonsList from "@/components/ListCollection.vue";
import ListCollection from "@/components/ListCollection.vue";

export default {
  components: {
    ListCollection
  },
  data: () => ({
    loading: true,
    generations: [1,2,3,4,5,6,7,8],
    types: [],
    allPokemons: [],
    myPokemons: [],
    order: 'date',
    cardAnimatedFlipped: [false,false],
    pseudo : localStorage.pseudo
  }),
  async created() {
    if(localStorage.token == null || localStorage.pseudo == null){
      this.$router.push({ name: 'login' });
    }

    this.types = await getAllType();
    this.allPokemons = await getAllPokemon();
    this.myPokemons = await getAllCollection(localStorage.pseudo, localStorage.token);
    this.loading = false;
  },
  methods: {
    setOrder(newOrder){
      this.order = newOrder;
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
            duration: 2000,
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
            if(this.myPokemons[p].pokemonId == idPokemon){
                return true;
            }
        }
        return false;
    },
    checkNextEvolution(idPok){
        let idPokemon = idPok;
        //if dont have next evo, retry, if it does, go to next evo
        if(this.allPokemons[idPokemon-1].apiEvolutions.length == 0){
            this.getNewPokemon();
            return;
        }
        else{ idPokemon = this.allPokemons[idPokemon-1].apiEvolutions[0].pokedexId}
        //if we have evo catch, other whise check next evo
        if(!this.hasPokemon(idPokemon)){
            this.catchPokemon(idPokemon);
            return idPokemon;
        }
        else{return this.checkNextEvolution(idPokemon)}
    },
    async catchPokemon(idPokemon){
        const res = await addPokemonToCollection(localStorage.pseudo,idPokemon, localStorage.token);
        if(res != null){
          this.myPokemons.push(res)
        }
    }, scaleUp(event){
        anime({
            targets: event.target,
            translateX: [Math.floor(Math.random()*10),-Math.floor(Math.random()*10),Math.floor(Math.random()*10),-Math.floor(Math.random()*10),0],
            translateY: [Math.floor(Math.random()*10),-Math.floor(Math.random()*10),Math.floor(Math.random()*10),-Math.floor(Math.random()*10),0],
            easing: 'easeInOutSine',
            duration: 500,
        });
    },orderPokeBy() {
      if(this.order === 'date'){
        return this.myPokemons
      }else if(this.order === 'pokedex') {
        return [...this.myPokemons].sort((a, b) => a.pokemonId - b.pokemonId)
      }
    },
  }
}

</script>

<template>
    <div v-if="loading">
        <img class="loadingGif center" src="../assets/images/loading.gif">
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
                    <p id="pokedexFrom">Pokedex de {{ pseudo }} : {{myPokemons.length}}/{{allPokemons.length}}</p>
                </div>
                <div class="col ">  
                    <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Trier
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" @click="setOrder('date')">Date d'aquisition</a></li>
                            <li><a class="dropdown-item" @click="setOrder('pokedex')">Ordre Pokedex</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <ListCollection :my-pokemons="orderPokeBy()" :all-pokemons="allPokemons"/>
    </div>
</template>

<style>
#newPokemonName{
    font-size: 30%;
    text-align: center;
}
#pokedexFrom{
    font-size: 120%;
}
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
</style>