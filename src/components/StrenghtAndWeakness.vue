<template>
  <div class="row wOrf">
    <div v-for="s in wOrf" class="col-lg-2">
      <div v-if="s.result === 'balanced'" id="balanced" class="f"><p>{{s.name}}</p></div>
      <div v-else-if="s.result === 'slightly-resistant'" id="slightly-resistant" class="f"><p>{{s.name}}</p></div>
      <div v-else-if="s.result === 'resistant'" id="resistant" class="f"><p>{{s.name}}</p></div>
      <div v-else-if="s.result === 'slightly-vulnerable'" id="slightly-vulnerable" class="f"><p>{{s.name}}</p></div>
      <div v-else-if="s.result === 'vulnerable'" id="vulnerable" class="f"><p>{{s.name}}</p></div>
    </div>
  </div>
</template>

<script>
export default {
  props:['wOrf']
}
</script>

<style scoped>
.f{
  border-radius: 10px;
}

.f p{
  padding: 1px;
}
#balanced{
  background: darkgray;
}

#slightly-resistant {
  background: greenyellow;
}

#resistant {
  color: white;
  background: green;
}

#slightly-vulnerable {
  background: orange;
}

#vulnerable {
  color: white;
  background: red;
}
.wOrf{
  margin: 10px;
}
</style>