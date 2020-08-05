<template>
  <span>
    <site-template>
      <span slot="menu-esquerdo">
        <img class="responsive-img" src="@/assets/logo.png">
      </span>
      
      <span slot="principal">
        <h2>Conta</h2>

        <form class="login-form">
          
          <grid-vue class="input-field" tamanho= "11">
            <input id="name" type="text" :value="name">
            <label for="name">Name</label>
          </grid-vue>
          
          <grid-vue class="input-field" tamanho= "11">
            <input class="validate" id="email" type="email" :value="email">
            <label data-error="wrong" data-success="right">Email</label>
          </grid-vue>
          
          <grid-vue class="file-field input-field" tamanho= "11">
            <div class="btn">
              <span>File</span>
              <input type="file">
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text">
            </div>
          </grid-vue>
        
          <grid-vue class="input-field" tamanho= "11">
            <input id="password" type="password" v-model="password">
            <label v-if="!password" for="password">Password</label>
          </grid-vue>

          <grid-vue class="input-field" tamanho= "11">
            <input id="password_confirmation" type="password" v-model="password_confirmation">
            <label v-if="!password_confirmation" for="password_confirmation">confirm password</label>
          </grid-vue>

          <div class="row">
            <grid-vue class="input-field" tamanho= "2">
              <a class="btn waves-effect waves-light" v-on:click="atualizar()">Atualizar</a> 
            </grid-vue>
            
          </div>    
          

          

        </form>
      </span>
    </site-template>
  </span>
</template>

<script>
import axios from 'axios';
import GridVue from '@/components/layouts/GridVue'
import SiteTemplate from '@/templates/SiteTemplate'

export default {
  name: 'Conta',
  data () {
      return{
        name: '',
        email: '',
        token: '',
        password: '',
        password_confirmation:''
      }
  },
  components:{
    GridVue,
    SiteTemplate,
  },
  created(){
    let usuarioSession = sessionStorage.getItem('usuario');
    if(usuarioSession){
      usuarioSession = JSON.parse(usuarioSession); 
      this.name = usuarioSession.name
      this.email = usuarioSession.email
      this.token = usuarioSession.token
    }
  },
  methods:{
    atualizar(){
      console.log('foi?');
      axios.put(`http://127.0.0.1:8000/api/conta`, {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      },{"headers": {"Authorization":"Bearer "+this.token}})
      .then(response => {
        console.log(response.data);
        if(response.data.token){ //logado
          console.log('Criado')
          sessionStorage.setItem('usuario', JSON.stringify(response.data))
        
        }else{ //erros de validação
          console.log(this.password + ' == ' + this.password_confirmation);
          let erros = '';
          for(let erro of Object.values(response.data)){
            erros += erro +"\n";
          }
          alert(erros);
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
