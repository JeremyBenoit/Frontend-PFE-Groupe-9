<script>
import {getAllPokemon} from "@/utils/pokebuildApi";
import {getAllTeam} from "@/utils/backendRequests";
import TeamRow from "@/components/TeamRow.vue";

export default {
  components: {
    TeamCard: TeamRow
  },
  data: () => ({
    teams: [],
    allPokemons: [],
    loading: true,
    order:'date'
  }),
  async created() {
    this.allPokemons = await getAllPokemon();
    this.teams = await getAllTeam()
    this.loading = false
  },
  methods: {
    setOrder(newOrder){
      this.order = newOrder
    },
    orderPokeBy() {
      if(this.order === 'date'){
        return [...this.teams].sort((a, b) => b.id - a.id)
      }else if(this.order === 'likes') {
        return [...this.teams].sort((a, b) => b.likes.length - a.likes.length)
      }
    }
  }
}
</script>

<template>
  <div v-if="loading">
    <img class="loadingGif center" src="../assets/images/loading.gif">
  </div>
  <div v-else>
    <div class="HomePage">
      <div class="container buttonsFilter">
        <div class="row row-cols-3">
          <div class="col ">
            <div class="dropdown">
              <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                 Trier par
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" @click="setOrder('likes')">Plus likés</a></li>
                <li><a class="dropdown-item" @click="setOrder('date')">Plus récents</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <RouterLink v-for="team in teams" :to="'/teams/'.concat(team.id)" class="card" style="width: 100%;">
          <TeamCard :team="team" :all-pokemons="allPokemons"/>
      </RouterLink>
    </div>
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
.HomePage {
  margin-bottom: 100px;
}
.buttonsFilter{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
