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
            <button v-if="btnSeguir" @click="amigo(donoDaPagina.id)" class="btn">{{textoBtn}}</button>
              
            {{usuario.description || 'Sem descrição'}}
          </span>
        </grid-vue>

      </div>
    </span>
     <span slot="menu-esquerdo-amigo">
      <h3>Seguidores</h3>
      <router-link v-for="item in amigos" :key="item.id" :to="'/pagina/'+item.id+'/'+$slug(item.name,{lowercase:true})">
      <li >{{item.name}}</li>
      </router-link>
      <li v-if="!amigos.length">Nenhum seguidor</li>
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
        donoDaPagina: {imagem:'', name:''},
        btnSeguir: false,
        amigos: [],
        amigosLogados: [],
        textoBtn: 'Seguir'
        
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
    this.atualizaPagina();
  },
  watch:{
    '$route':'atualizaPagina'
  },
  methods:{
    atualizaPagina(){
      let usuarioSession = this.$store.getters.getUsuario;
      if(usuarioSession){
        this.usuario = this.$store.getters.getUsuario;
        this.$http.get(this.$url+`conteudo/pagina/`+this.$route.params.id,
        {"headers": {"Authorization":"Bearer "+this.$store.getters.getToken}})
        .then(response => {
          console.log(response.data && this.$route.name == 'Pagina')
          if(response.data.status){
            this.$store.commit('setLinhaDoTempo',response.data.conteudos.data)
            this.urlProxPagina = response.data.conteudos.next_page_url;
            this.donoDaPagina = response.data.dono;
            this.pararScroll = false;
            if(this.donoDaPagina.id != this.usuario.id){
              this.btnSeguir = true;
            }else{
              this.btnSeguir = true;
            }
            this.$http.get(this.$url+`usuario/amigo/`+this.donoDaPagina.id,
            {"headers": {"Authorization":"Bearer "+this.$store.getters.getToken}})
            .then(response => {
              console.log(response.data)
              if(response.data.status){
                this.amigos = response.data.amigos;
                this.amigosLogados = response.data.amigosLogados;
                this.eAmigo()
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
    eAmigo(){
      for(let amigo of this.amigosLogados){
        if(amigo.id == this.donoDaPagina.id){
          this.textoBtn = 'Parar de seguir';
          console.log('OK')
          return;
        }
      }
      this.textoBtn = 'Seguir';
    },
    amigo(id){
      this.$http.post(this.$url+`usuario/amigo/`, {id: id},
        {"headers": {"Authorization":"Bearer "+this.$store.getters.getToken}}
      )
      .then( response => {
        if(response.data.status){
           this.amigosLogados = response.data.amigos;
           this.eAmigo();
        }else{
          alert(response.data.erro)
        }
           
      })
      .catch(e => {
        
        alert('ERROR! tente novamente mais tarde.'+e);
      })      
    },
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
