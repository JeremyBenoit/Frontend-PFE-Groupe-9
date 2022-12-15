<script setup>
let videos = [ { url : "VOuamSswJeA", description : "La base du team building par Redemption"}, 
                { url : "EfM3rSEZkek", description : "La base de la stratégie par Fildrong"}, 
                { url : "_0IzAhd2bsI", description : "Le lexique de la stratégie par Fildrong"}, 
                { url : "J7WBpC6ICrU", description : "Les rôles des pokémon par Fildrong"}, 
                { url : "y0k2Mh-IKss", description : "Le lexique avancé de la stratégiepar Fildrong"}, 
                { url : "W2lWHQgmEss", description : "Les différents types de team par Fildrong"}]
</script>

<template>
    <div v-for="video in videos">
        <iframe class="tutos" :src="'https://www.youtube.com//embed/' + video.url "
        width="560" height="315"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; piture-in-picutre" allowfullscreen>
        </iframe>
        <p class="description">
            {{ video.description }}
        </p>
    </div>
    
</template>

<style scoped>
.tutos {
    margin-left: 25%;
    margin-top: 10px;
    margin-bottom: 10px;
}

.description{
    text-align: center;
}
</style>