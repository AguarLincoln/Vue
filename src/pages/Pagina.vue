<template>
  <site-template>
    <span slot="menu-esquerdo">
      <div class="row valign-wrapper">
        <grid-vue tamanho="4">
          <router-link :to="'/pagina/'+this.donoDaPagina.id+'/'+$slug(donoDaPagina.name,{lowercase:true})">
            <img :src="donoDaPagina.image" :alt="donoDaPagina.name" class="circle responsive-img"> <!-- notice the "circle" class -->
          </router-link>
        </grid-vue>
        
        <grid-vue tamanho="8">
          <span class="black-text">
            <router-link :to="'/pagina/'+this.donoDaPagina.id+'/'+$slug(donoDaPagina.name,{lowercase:true})">
              <h5>{{donoDaPagina.name}}</h5>
            </router-link>
            {{usuario.description || 'Sem descrição'}}
          </span>
        </grid-vue>

      </div>
    </span>

    <span slot="principal">
    
      <publicar-conteudo />    

      <card-conteudo-vue v-for="item in listaConteudos" :key="item.id"
        :id = item.id
        :usuarioid="item.user.id"
        :totalCurtidas="item.total_curtidas"
        :curtiuConteudo="item.curtiu_conteudo"
        :comentarios="item.comentarios"
        :perfil="item.user.image"
        :data="item.data_link" 
        :nome="item.user.name"> 
        
        <conteudo-post :img="item.image" :titulo="item.titulo" 
          :descricao="item.texto" :link="item.link"/>
        
      </card-conteudo-vue>
      <button  v-if="urlProxPagina" @click="carregaPaginacao()" class="btn blue">mais...</button>
      <div v-scroll="handleScroll"></div>
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
  name: 'Pagina',
  data () {
      return{
        usuario: false,
        urlProxPagina: null,
        pararScroll: false,
        donoDaPagina: {imagem:'', name:''}
        
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
      this.$http.get(this.$url+`conteudo/pagina/`+this.$route.params.id,
      {"headers": {"Authorization":"Bearer "+this.$store.getters.getToken}})
      .then(response => {
        console.log(response.data)
        if(response.data.status){
          this.$store.commit('setLinhaDoTempo',response.data.conteudos.data)
          this.urlProxPagina = response.data.conteudos.next_page_url;
          this.donoDaPagina = response.data.dono;
         
          
        }
      })
      .catch(e => {
        
        alert('ERROR! tente novamente mais tarde.'+e);
      })     
    }
  },
  methods:{

    handleScroll: function (evt, el) {
      if(this.pararScroll)
        return;

      if(window.scrollY >= document.body.clientHeight - 966){
        console.log('teste')
        this.pararScroll = true;
        this.carregaPaginacao();
      }
    },  
    carregaPaginacao(){
      if(!this.urlProxPagina)
        return;

      this.$http.get(this.urlProxPagina, {"headers": {"Authorization":"Bearer "+this.$store.getters.getToken}}
      )
      .then(response => {
        if(response.data.status){
          console.log('setou')
          this.$store.commit('setPaginacao',response.data.conteudos.data)
          this.urlProxPagina = response.data.conteudos.next_page_url;
          this.pararScroll = false;
        }
      })
      .catch(e => {
        
        alert('ERROR! tente novamente mais tarde.'+e);
      })     
    }
  },
  computed:{
    listaConteudos(){
      return this.$store.getters.getLinhaDoTempo;       
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
