<script>
export default {props:['teamId']};
</script>

<script setup >
import OneTeamCard from "@/components/OneTeamCard.vue";
import {getDefensiveCoverage} from "@/utils/pokebuildApi";
import StrenghtAndWeakness from "@/components/StrenghtAndWeakness.vue";

const name = "test";
const comments = ['test','test'];
const pokemons = [1,2,3,4,5,6];
const wOrf = await getDefensiveCoverage(pokemons)
</script>


<template>
  <h3>Team {{name}}</h3>
  <OneTeamCard :teamId="teamId"/>
  <div class="strengthWeakness">
    <h3>Force et faiblesse</h3>
    <StrenghtAndWeakness :wOrf="wOrf"/>
  </div>
  <div class="comments">
    <h3>Comments</h3>
    <div v-for="(comment) in comments" class="row">
      <div>
        {{comment}}
      </div>
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
</style>