<script>
export default {props:['teamId']};
</script>

<script setup >
import OneTeamCard from "@/components/OneTeamCard.vue";

const name = "test";
const comments = ['test','test'];
</script>


<template>
  <h3>Team {{name}}</h3>
  <OneTeamCard :teamId="teamId"/>
  <div class="strengthWeakness">
    <h3>Force et faiblesse</h3>
    force et faiblesse à faire
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