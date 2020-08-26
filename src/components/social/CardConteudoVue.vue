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
      <a style="cursor:pointer" @click="curtida(id)"><i class="material-icons">{{curtir}}</i>{{totalCurtidas}}</a>
        
        <i class="material-icons">insert_comment</i>
    </div>
  </div>
  
</template>

<script>
import GridVue from '@/components/layouts/GridVue'

export default {
  name: 'CardConteudoVue',
  props: ['id', 'perfil', 'data', 'nome', 'totalCurtidas', 'curtiuConteudo'],
  components:{
    GridVue
  },
  data () {
      return{
        curtir: this.curtiuConteudo ? 'favorite' : 'favorite_border',
        totalDeCurtidas: this.totalCurtidas
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
        }else{
          alert(response.data.erro)
        }
           
      })
      .catch(e => {
        
        alert('ERROR! tente novamente mais tarde.'+e);
      })


      if(this.curtir == 'favorite_border'){
        this.curtir = 'favorite'
      }else{
        this.curtir = 'favorite_border'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
