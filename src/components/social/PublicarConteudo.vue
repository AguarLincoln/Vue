<template>
  <div class="row">
    <grid-vue class="input-field" tamanho="12">
      <input type="text" v-model="conteudo.titulo"/>
      <textarea v-if="conteudo.titulo" placeholder="Conteudo" v-model="conteudo.texto" class="materialize-textarea"></textarea>
      <input v-if="conteudo.titulo && conteudo.texto" type="text" v-model="conteudo.link" placeholder="Link"/>
      <input v-if="conteudo.titulo && conteudo.texto" type="text" v-model="conteudo.image" placeholder="URL imagem"/>
      <label>Faça um post</label>   
    </grid-vue>
    <p class="right-align">
      <button v-if="conteudo.titulo && conteudo.texto" v-on:click="publicar()" class="btn z-depth-3 waves-effect waves-light" tamanho="2 offset-s10">
        Publicar
      </button>
    </p>
  </div>
 
</template>

<script>
import GridVue from '@/components/layouts/GridVue'

export default {
  name: 'PublicarConteudo',
  props: [],
  components:{
    GridVue
  },
  data () {
      return{
        conteudo: {titulo: '', texto: '', link: '', image: ''}
      }
  },
  methods:{
    publicar(){
      this.$http.post(this.$url+`conteudo`,{
        titulo: this.conteudo.titulo,
        texto: this.conteudo.texto,
        link: this.conteudo.link,
        image: this.conteudo.image
      },
      {"headers": {"Authorization":"Bearer "+this.$store.getters.getToken}})
      .then(response =>{
        
        if(response.data.status){
          console.log(response.data.conteudos.data)
          this.conteudo = {titulo: '', texto: '', link: '', image: ''}
          this.$store.commit('setLinhaDoTempo',response.data.conteudos.data)
        }else if(response.data.status == false && response.data.validacao){ //erros de validação
          let erros = 'Error = ';
          for(let erro of Object.values(response.data.erros)){
            erros += erro +"\n";
          }
          alert(erros);
        }
      })
      .catch( e=> {

      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
