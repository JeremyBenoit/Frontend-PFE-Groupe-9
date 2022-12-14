<script setup>
import heart from '../assets/heart.png';

let images = ["poke1", "poke2", "poke3", "poke4", "poke5", "poke6"]
</script>

<template>
    <div class="card" style="width: 100%;">
        <div class="card-body">
            <h5 class="card-title">Pokemon Team</h5>
            <div class="container">
                <div class="row">
                    <div v-for="image in images" class="col">
                        {{ image }}
                    </div>
                </div>
            </div>
            <div class="nrbHearts">
                10 <img :src="heart" class="heart">
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
</style>