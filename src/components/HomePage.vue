<script>
import OverViewTeam from './OverviewTeam.vue';
import {getAllTeam} from '../utils/backendRequests';

export default {
  components: {
    OverViewTeam,
  },
  data: () => ({
    loading: [true,"Initialisation..."],
    allTeams: [],
    pseudo : localStorage.pseudo
  }),
  async created() {
    if(localStorage.token == null || localStorage.pseudo == null){
      this.$router.push({ name: 'login' });
    }

    this.loading[1]="Chargement des équipes..."
    this.allTeams = await getAllTeam();
    this.loading[0] = false;
  },
  methods: {
  }
}

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
