<template>

  <div class="card">
    <div class="card-content white-text">
     
      <div class="row valign-wrapper">
        <grid-vue tamanho="1">
          <img :src="perfil" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
        </grid-vue>

        <grid-vue tamanho="11">
          <span class="black-text">
            <strong>{{nome}}</strong> - <small>{{data}}</small>
          </span>
        </grid-vue>
      </div>   

      <slot></slot>

    </div>
    <div class="card-action">
      <p>
        <a style="cursor:pointer" @click="curtida(id)"><i class="material-icons red-text">{{curtir}}</i><font color="black">{{totalCurtidas}}</font></a>
        <a style="cursor:pointer" @click="abreComentario()"><i class="material-icons black-text">insert_comment</i><font color="black">{{comentarios.length}}</font></a>  
      </p>
      <p v-if="exibirComentario" class="right-align">
        <input type="text" v-model="comentario" placeholder="comentar">
        <button v-if="comentario" @click="comentar(id)" class="btn waves-effect waves-light white"><i class="material-icons black-text">send</i></button>
      </p>
      <p v-if="exibirComentario">
        <ul class="collection">
          <li class="collection-item avatar" v-for="item in comentarios" :key="item.id">
            <img class="circle" :src="item.user.image" >
            <span class="title">{{item.user.name}} <small> - {{item.data}}</small> </span>
            <p>{{item.texto}}</p>
          </li>
        </ul>
      </p>
    </div>
  </div>
  
</template>

<script>
import GridVue from '@/components/layouts/GridVue'

export default {
  name: 'CardConteudoVue',
  props: ['id', 'perfil', 'data', 'nome', 'totalCurtidas', 'curtiuConteudo', 'comentarios'],
  components:{
    GridVue
  },
  data () {
      return{
        curtir: this.curtiuConteudo ? 'favorite' : 'favorite_border',
        totalDeCurtidas: this.totalCurtidas,
        exibirComentario: false,
        comentario: ''
      }
  },
  methods:{
    curtida(id){
      
      this.$http.put(this.$url+`conteudo/curtir/`+ id, {},
        {"headers": {"Authorization":"Bearer "+this.$store.getters.getToken}}
      )
      .then( response => {
        if(response.status){
          console.log(response.data)
          this.totalDeCurtidas = response.data.curtidas
          this.$store.commit('setLinhaDoTempo',response.data.lista.conteudos.data)
          if(this.curtir == 'favorite_border'){
            this.curtir = 'favorite'
          }else{
            this.curtir = 'favorite_border'
          }
        }else{
          alert(response.data.erro)
        }
           
      })
      .catch(e => {
        
        alert('ERROR! tente novamente mais tarde.'+e);
      })      
    },
    abreComentario(){
      this.exibirComentario = !this.exibirComentario
    },
    comentar(id){

      if(!this.comentario){
        return;
      }

      this.$http.put(this.$url+`conteudo/comentar/`+ id, {
        texto: this.comentario
      },
        {"headers": {"Authorization":"Bearer "+this.$store.getters.getToken}}
      )
      .then( response => {
        if(response.status){
          console.log(response.data)
          this.comentario = ''
          this.$store.commit('setLinhaDoTempo',response.data.lista.conteudos.data)
        }else{
          alert(response.data.erro)
        }
           
      })
      .catch(e => {
        
        alert('ERROR! tente novamente mais tarde.'+e);
      })
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
