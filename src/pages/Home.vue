<template>
  <site-template>
    <span slot="menu-esquerdo">
      <div class="row valign-wrapper">
        <grid-vue tamanho="4">
          <img :src="usuario.image" :alt="usuario.name" class="circle responsive-img"> <!-- notice the "circle" class -->
        </grid-vue>
        
        <grid-vue tamanho="8">
          <span class="black-text">
            <h5>{{usuario.name}}</h5>
            {{usuario.description || 'Sem descrição'}}
          </span>
        </grid-vue>

      </div>
    </span>

    <span slot="principal">
    
      <publicar-conteudo />    

      <card-conteudo-vue perfil="https://materializecss.com/images/yuna.jpg"
        data="01/01/2020" hora="12:30" nome="Maria Silva">
        
        <conteudo-post img="https://materializecss.com/images/sample-1.jpg" 
          titulo="Paisagem" descricao="ftfedtfef"/>
        
      </card-conteudo-vue>
    </span>

  </site-template>
</template>

<script>

import GridVue from '@/components/layouts/GridVue'
import SiteTemplate from '@/templates/SiteTemplate'
import CardConteudoVue from '@/components/social/CardConteudoVue'
import ConteudoPost from '@/components/social/ConteudoPost'
import PublicarConteudo from '@/components/social/PublicarConteudo'

export default {
  name: 'Home',
  data () {
      return{
        usuario: ''
      }
  },
  components:{
    CardConteudoVue,
    ConteudoPost,
    PublicarConteudo,
    SiteTemplate,
    GridVue,
    
    
  },
  created(){
    let usuarioSession = this.$store.getters.getUsuario;
    if(usuarioSession){
      this.usuario = this.$store.getters.getUsuario;     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
