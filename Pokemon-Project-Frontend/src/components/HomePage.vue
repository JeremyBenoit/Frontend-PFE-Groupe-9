<script setup>
import OverViewTeam from './OverviewTeam.vue';
</script>

<template>
  <div class="HomePage"> 
    <div class="container">
      <div class="row row-cols-3">
        <div class="col">
          <button class="btn btn-primary">Most liked</button>
        </div>
        <div class="col">
          <button class="btn btn-primary">Most recent</button>
        </div>
      </div>
    </div>
    <h1>this is the home page</h1>
    <OverViewTeam />
  </div>
</template>

<style scoped>
.HomePage {
  margin-bottom: 100px;
}
</style>
