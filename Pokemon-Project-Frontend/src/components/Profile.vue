<script>

import poke1 from "../assets/images/001.png";
import poke2 from "../assets/images/002.png";
import poke3 from "../assets/images/003.png";
import poke4 from "../assets/images/004.png";
import poke5 from "../assets/images/005.png";
import poke6 from "../assets/images/006.png";
import poke7 from "../assets/images/007.png";

const likedAndCreatedTeams = [poke1, poke2, poke3, poke4, poke5, poke6];

export default {
  data() {
    return {
      teams: likedAndCreatedTeams,
    }
  },
  methods: {
    changeToLikedTeams() {
      this.teams = [poke1, poke2, poke3, poke4, poke5, poke6]
    },
    changeToMyTeams() {
      this.teams = [poke1, poke2, poke3, poke4, poke5, poke7];
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