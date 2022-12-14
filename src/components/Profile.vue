<script>
import { getAllLikedByUserId, getAllByAuthorId } from "@/utils/backendRequests"
import {getAllPokemon} from "@/utils/pokebuildApi";

export default {
  data() {
    return {
      teams: [],
      allPokemons: [],
      loading: true
    }
  },
  async created() {
    if (localStorage.token == null || localStorage.pseudo == null) {
      this.$router.push({name: 'login'});
      return;
    }
    let res = await getAllLikedByUserId(localStorage.token, localStorage.pseudo)
    if (res === 401) {
      localStorage.clear()
      this.$router.push({name: 'login'});
      return;
    }
    this.allPokemons = await getAllPokemon()
    this.teams = res
    this.loading = false
  },
  methods: {
    async changeToLikedTeams() {
      let res = await getAllLikedByUserId(localStorage.token, localStorage.pseudo)
      if(res === 401){
        localStorage.clear()
        this.$router.push({name: 'login'});
        return;
      }
      this.teams = res
    },
    async changeToMyTeams() {
      let res = await getAllByAuthorId(localStorage.token, localStorage.pseudo)
      if(res === 401){
        localStorage.clear()
        this.$router.push({name: 'login'});
        return;
      }
      this.teams = res
    }, showImage(id) {
      return this.allPokemons[id-1].sprite
    }
  }
}

</script>

<template>
  <div v-if="loading">
    <img class="loadingGif center" src="../assets/images/loading.gif">
  </div>
  <div v-else>
    <div class="container buttonsFilter">
      <div class="row row-cols-3">
        <div class="col">
          <button v-on:click="changeToLikedTeams" class="btn btn-primary">My liked teams</button>
        </div>
        <div class="col">
          <button v-on:click="changeToMyTeams" class="btn btn-primary">My teams</button>
        </div>
      </div>
    </div>
    <div class="card" style="width: 100%;">
      <div class="card-body">
        <h5 class="card-title">Pokemon Team</h5>
        <div class="container">
          <div v-for="t in teams" class="row">
            <div v-for="p in t.pokemons" class="col">
              <img :src="showImage(p)" class="imagePokemon">
            </div>
            <div class="nrbHearts">
              {{ t.likes.length }} <img src='../assets/heart.png' class="heart">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.imagePokemon {
  width: 100%;
  height: auto;
}

.heart {
  width: 2%;
  height: auto;
}

.nrbHearts{
  font-size: 175%;
}

.card-title {
  margin-left: 45%;
}

.buttonsFilter{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>