<template>
  <span>
    <div v-if="img" class="card-image">
      <a  v-if="link && link != ''" :href="link" target="_blank">
        <img :src="img">
        <span class="card-title">{{titulo}}</span>
      </a>
      
    </div>

    <div class="card-content black-text">
      <p v-if="!img">
        <h4>{{titulo}}</h4>
      </p>
      <p>{{descricao}}</p>
      <p><a :href="link" target="_blank">redirecionar ao site</a></p>
    </div>
  </span>
</template>

<script>
export default {
  name: 'ConteudoPost',
  props: ['img', 'titulo', 'descricao', 'link'],
  data () {
      return{

      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>


