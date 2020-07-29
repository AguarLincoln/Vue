<template>
  <site-template>
    <publicar-conteudo/>    

    <card-conteudo-vue perfil="https://materializecss.com/images/yuna.jpg"
      data="01/01/2020" hora="12:30" nome="Maria Silva">
      
      <conteudo-post img="https://materializecss.com/images/sample-1.jpg" 
        titulo="Paisagem" descricao="ftfedtfef"/>
      
    </card-conteudo-vue>
  </site-template>
</template>

<script>

import SiteTemplate from '@/templates/SiteTemplate'
import CardConteudoVue from '@/components/social/CardConteudoVue'
import ConteudoPost from '@/components/social/ConteudoPost'
import PublicarConteudo from '@/components/social/PublicarConteudo'

export default {
  name: 'Home',
  data () {
      return{

      }
  },
  components:{
    CardConteudoVue,
    ConteudoPost,
    PublicarConteudo,
    SiteTemplate,
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
