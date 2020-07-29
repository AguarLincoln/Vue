<template>
  <div class="row">
    <grid-vue class="input-field" tamanho="12">
      <textarea v-model="conteudo" class="materialize-textarea"></textarea>
      <label>Faça um post</label>
    </grid-vue>
    
    <grid-vue v-if="conteudo" class="btn z-depth-3 waves-effect waves-light" tamanho="2 offset-s10">
      Publicar
    </grid-vue>
    
  </div>
 
</template>

<script>
import GridVue from '@/components/layouts/GridVue'

export default {
  name: 'PublicarConteudo',
  props: ['tamanho'],
  components:{
    GridVue
  },
  data () {
      return{
        conteudo:''
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
