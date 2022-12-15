<script>
import { getAllLikedByUserId, getAllByAuthorId } from "@/utils/backendRequests"
import { getAllPokemon } from "@/utils/pokebuildApi";
import TeamRow from "@/components/TeamRow.vue";

export default {
  components: {TeamCard: TeamRow},
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
    this.allPokemons = await getAllPokemon()
    this.teams = await getAllLikedByUserId(localStorage.token, localStorage.pseudo)
    if (this.teams === 401) {
      localStorage.clear()
      this.$router.push({name: 'login'});
      return;
    }
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
          <button v-on:click="changeToLikedTeams" class="btn btn-primary">Mes teams likés</button>
        </div>
        <div class="col">
          <button v-on:click="changeToMyTeams" class="btn btn-primary">Mes teams crées</button>
        </div>
      </div>
    </div>
    <RouterLink v-for="team in teams" :to="'/teams/'.concat(team.id)" class="card" style="width: 100%;">
      <TeamCard :team="team" :all-pokemons="allPokemons"/>
    </RouterLink>
  </div>
</template>

<style scoped>
.center{
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.loadingGif{
  width: 20%;
}
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