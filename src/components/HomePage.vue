<script setup>
import OverViewTeam from './OverviewTeam.vue';
</script>

<template>
  <div class="HomePage"> 
    <div class="container buttonsFilter">
      <div class="row row-cols-3">
        <div class="col">
          <button class="btn btn-primary">Most liked</button>
        </div>
        <div class="col">
          <button class="btn btn-primary">Most recent</button>
        </div>
      </div>
    </div>
    <OverViewTeam />
  </div>
</template>

<style scoped>
.HomePage {
  margin-bottom: 100px;
}

.buttonsFilter{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
