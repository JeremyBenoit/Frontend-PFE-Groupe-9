<script>
import OnePokemonCard from "@/components/OnePokemonCard.vue";
import {createLike} from "@/utils/backendRequests";

export default {
  components:{OnePokemonCard},
  props:['team','likes','teamId'],
  data: () => {
    return {
      liked:false
    }
  },
  created() {
    for (let like in this.likes) {
      if (this.likes[like].userId === localStorage.pseudo){
        this.liked = true;
      }
    }
  },
  methods:{
    async addLike(){
      const res = await createLike(localStorage.pseudo,this.teamId);
      if (res != null){
        this.likes.push(res);
        this.liked = true;
      }
    }
  }
}
</script>
<template>
  <div class="row pokemonTeam">
    <div v-for="poke in team" class="col">
      <div>
        <OnePokemonCard :pokemon="poke" />
      </div>
    </div>
    <div class="nrbHearts" v-if="liked">
      <p id="likes">{{likes.length}} <img src="../assets/heart.png" class="heart" alt="heart"></p>
    </div>
    <div class="nrbHearts" v-else>
      <p @click="addLike()" id="likes">{{likes.length}} <img src="../assets/heartEmpty.png" class="heart" alt="heart"></p>
    </div>
  </div>
</template>

<style scoped>
.heart {
  width: 2%;
  height: auto;
}

.nrbHearts{
  font-size: 175%;
}
.pokemonTeam {
  margin: 30px;
  text-align: center;
}
</style>