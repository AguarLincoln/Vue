<template>
  <site-template>
    <span slot="menu-esquerdo">
      <div class="row valign-wrapper">
        <grid-vue tamanho="4">
          <router-link :to="'/pagina/'+this.usuario.id+'/'+$slug(usuario.name,{lowercase:true})">
            <img :src="usuario.image" :alt="usuario.name" class="circle responsive-img"> <!-- notice the "circle" class -->
          </router-link>
        </grid-vue>
        
        <grid-vue tamanho="8">
          <span class="black-text">
            <router-link :to="'/pagina/'+this.usuario.id+'/'+$slug(usuario.name,{lowercase:true})">
              <h5>{{usuario.name}}</h5>
            </router-link>
            {{usuario.description || 'Sem descrição'}}
          </span>
        </grid-vue>

      </div>
    </span>
    <span slot="menu-esquerdo-amigo">
      <h3>Seguindo</h3>
      <router-link v-for="item in amigos" :key="item.id" :to="'/pagina/'+item.id+'/'+$slug(item.name,{lowercase:true})">
        <li>{{item.name}}</li>
      </router-link>
      <li v-if="!amigos.length">Nenhum seguidor</li>

      <h3>Seguidores</h3>
      <router-link v-for="item in seguidores" :key="item.id" :to="'/pagina/'+item.id+'/'+$slug(item.name,{lowercase:true})">
      <li >{{item.name}}</li>
      </router-link>
      <li v-if="!seguidores.length">Nenhum seguidor</li>
      
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
  name: 'Home',
  data () {
      return{
        usuario: {imagem:'', name:''},
        urlProxPagina: null,
        pararScroll: false,
        amigos: [],
        seguidores: []
        
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
      this.$http.get(this.$url+`conteudo`,
      {"headers": {"Authorization":"Bearer "+this.$store.getters.getToken}})
      .then(response => {
        console.log(response.data)
        if(response.data.status){
          this.$store.commit('setLinhaDoTempo',response.data.conteudos.data)
          this.urlProxPagina = response.data.conteudos.next_page_url;
          
          this.$http.get(this.$url+`usuario/amigo`,
          {"headers": {"Authorization":"Bearer "+this.$store.getters.getToken}})
          .then(response => {
            console.log(response.data)
            if(response.data.status){
              this.amigos = response.data.amigos;
              this.seguidores = response.data.seguidores;
            }else{
              alert(response.data.erro)
            }
          })
          .catch(e => {

            alert('ERROR! tente novamente mais tarde.'+e);
          })
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
        if(response.data.status && this.$route.name == 'Home'){
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
