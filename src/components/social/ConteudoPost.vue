<template>
  <span>
    <div v-if="img" class="card-image">
      <img :src="img">
      <span class="card-title">{{titulo}}</span>
    </div>

    <div v-if="descricao" class="card-content black-text">
      <p>{{descricao}}</p>
    </div>
  </span>
</template>

<script>
export default {
  name: 'ConteudoPost',
  props: ['img', 'titulo', 'descricao'],
  data () {
      return{

      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>


