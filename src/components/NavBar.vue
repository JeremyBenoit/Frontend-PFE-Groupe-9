<script>
export default {
  data: () => ({
    isConnected: localStorage.pseudo != null && localStorage.token != null
  }),
  methods: {
    logout(){
      localStorage.clear()
      this.$router.push({name: 'login'});
    }
  }
}
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <RouterLink to="/" class="nav-link"><a class="navbar-brand" href="#">PTM</a></RouterLink>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink to="/build-team" class="nav-link">Team Builder</RouterLink>
                    </li>
                    <li v-if="isConnected" class="nav-item">
                        <RouterLink to="/collection" class="nav-link">Collection</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/tuto" class="nav-link">Tutoriel</RouterLink>
                    </li>
                </ul>
            <RouterLink v-if="!isConnected" to="/login" class="nav-link">
              <button type="button" class="btn btn-primary">Se connecter</button>
            </RouterLink>
              <button v-if="isConnected" type="button" class="btn btn-outline-primary" v-on:click="logout">Se déconnecter</button>
            <RouterLink v-if="isConnected" to="/profile" class="nav-link">
              <button type="button" class="btn btn-primary">Profil</button>
            </RouterLink>

            </div>
        </div>
    </nav>
</template>