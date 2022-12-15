<script>
export default {
  props: ['team','allPokemons']
}
</script>
<template>
  <div  class="card-body">
    <h5 class="card-title">{{ team.name }}</h5>
    <div class="container">
      <div  class="row" >
        <div v-for="poke in team.pokemons" class="col">
          <img :src="this.allPokemons[poke-1].sprite" class="imagePokemon">
        </div>
        <div class="nrbHearts">
          {{ team.likes.length }} <img src='../assets/heart.png' class="heart">
        </div>
      </div>
    </div>
  </div>
</template>
<style>

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
.imagePokemon {
  width: 100%;
  height: auto;
}

</style>
