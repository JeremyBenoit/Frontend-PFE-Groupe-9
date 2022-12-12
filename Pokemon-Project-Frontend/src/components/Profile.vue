<script>
import { getAllLikedByUserId, getAllByAuthorId } from "@/utils/backend"

export default {
  data() {
    return {
      teams: [],
    }
  },
  created() {
    if(localStorage.token == null || localStorage.pseudo == null){
      this.$router.push({ name: 'login' });
      return;
    }
    const fetchData = async () => {
      this.teams = await getAllLikedByUserId(localStorage.token,localStorage.pseudo)
    };
    fetchData();
  },
  methods: {
    async changeToLikedTeams() {
      this.teams = await getAllLikedByUserId(localStorage.token,localStorage.pseudo)
    },
    async changeToMyTeams() {
      this.teams = await getAllByAuthorId(localStorage.token,localStorage.pseudo)
    }
  }
}

</script>

<template>
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
        <div class="row">
          <div v-for="image in teams" class="col">
            <img :src="image" class="imagePokemon">
          </div>
        </div>
      </div>
      <div class="nrbHearts">
        10 <img src='../assets/heart.png' class="heart">
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