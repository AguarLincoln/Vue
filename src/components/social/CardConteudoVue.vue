<template>

  <div class="card">
    <div class="card-content white-text">
     
      <div class="row valign-wrapper">
        <grid-vue tamanho="1">
          <img :src="perfil" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
        </grid-vue>

        <grid-vue tamanho="11">
          <span class="black-text">
            <strong>{{nome}}</strong> - <small>{{data}} {{hora}}</small>
          </span>
        </grid-vue>
      </div>   

      <slot></slot>

    </div>
    <div class="card-action">
        <i class="material-icons">favorite_border</i>
        <i class="material-icons">insert_comment</i>
    </div>
  </div>
  
</template>

<script>
import GridVue from '@/components/layouts/GridVue'

export default {
  name: 'CardConteudoVue',
  props: ['perfil', 'data', 'hora', 'nome'],
  components:{
    GridVue
  },
  data () {
      return{

      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
