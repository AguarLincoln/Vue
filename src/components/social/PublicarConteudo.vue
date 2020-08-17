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
  props: ['usuario'],
  components:{
    GridVue
  },
  data () {
      return{
        conteudo: {titulo: '', texto: '', link: '', imagem: ''}
      }
  },
  methods:{
    publicar(){
      this.$http.post(this.$url+`conteudo`,{
        titulo: this.conteudo.titulo,
        texto: this.conteudo.texto,
        link: this.conteudo.link,
        imagem: this.conteudo.imagem
      },
      {"headers": {"Authorization":"Bearer "+this.usuario.token}})
      .then(response =>{
        
        if(response.data.status){
          console.log(response.data)
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
