<script setup>
import tempTeamData from '../assets/tempTeamData.json'

import poke1 from '../assets/images/001.png';
import poke2 from '../assets/images/002.png';
import poke3 from '../assets/images/003.png';
import poke4 from '../assets/images/004.png';
import poke5 from '../assets/images/005.png';
import poke6 from '../assets/images/006.png';

import heart from '../assets/heart.png';

let images = [poke1, poke2, poke3, poke4, poke5, poke6]
</script>

<template #default>
    <div class="card" style="width: 100%;">
        <div class="card-body">
            <h5 class="card-title">Pokemon Team</h5>
            <div class="container">
                <div class="row">
                    <div v-for="image in images" class="col">
                        <img :src="image" class="imagePokemon">
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
</style>