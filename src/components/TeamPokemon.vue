<script>
import {createComment, getAllComment, getOneTeamById} from "@/utils/backendRequests";
import {getDefensiveCoverage, getOnePokemon} from "@/utils/pokebuildApi";
import OneTeamCard from "@/components/OneTeamCard.vue";
import StrenghtAndWeakness from "@/components/StrenghtAndWeakness.vue";

export default {
  components:{OneTeamCard, StrenghtAndWeakness},
  props:['teamId'],
  data: () => {
    return {
      loading: true,
      team: [],
      pokemons:[],
      comments: [],
      wOrf: []
    }
  },
  async created(){
    this.team = await getOneTeamById(this.teamId);
    for (const poke of this.team.pokemons) {
      this.pokemons.push(await getOnePokemon(poke));
    }
    this.comments = await getAllComment(this.teamId);
    this.wOrf = await getDefensiveCoverage(this.team.pokemons)
    this.loading = false;
  },
  methods:{
    async addComment(){
      const comment = document.getElementById("comment").value;
      const res = await createComment(localStorage.pseudo,this.teamId,comment);
      this.comments.push(res);
    }
  }
};

</script>

<template>
  <div v-if="loading">
    <img class="loadingGif center" src="../assets/images/loading.gif">
  </div>
  <div v-else>
    <h3>Team {{team.name}}</h3>
    <OneTeamCard :team="pokemons" :likes="team.likes" :teamId="team.id" />
    <div class="strengthWeakness">
      <h3>Force et faiblesse</h3>
      <StrenghtAndWeakness :wOrf="wOrf"/>
    </div>
    <div class="comments">
      <h3>Comments</h3>
      <div v-for="(comment) in comments" class="row">
        <div class="col">
          <p>{{comment.authorId}} : {{comment.content}}</p>
        </div>
      </div>
      <h5>Faites votre commentaire</h5>
      <input id="comment">
      <button @click="addComment()" >Enregistrer</button>
    </div>
  </div>
</template>

<style scoped>
h3{
  color: cornflowerblue;
  text-align: center;
}
.strengthWeakness{
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
}
.comments {
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
}
.center{
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.loadingGif{
  width: 20%;
}
</style>