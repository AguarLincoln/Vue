<template>
  <span>
    <login-template>
      <span slot="menu-esquerdo">
        <img src="@/assets/logo.png" class="responsive-image">
      </span>
      
      <span slot="principal">
        <h2>Cadastro</h2>

        <form class="login-form">
          
          <grid-vue class="input-field" tamanho= "11">
            <input id="name" type="text" v-model="name">
            <label for="name">Name</label>
          </grid-vue>

          <grid-vue class="input-field" tamanho= "11">
            <input id="description" type="text" v-model="description">
            <label for="description">Description</label>
          </grid-vue>
          
          <grid-vue class="input-field" tamanho= "11">
            <input class="validate" id="email" type="email" v-model="email">
            <label for="email" data-error="wrong" data-success="right">Email</label>
          </grid-vue>
        
        
          <grid-vue class="input-field" tamanho= "11">
            <input id="password" type="password" v-model="password">
            <label for="password">Password</label>
          </grid-vue>

          <grid-vue class="input-field" tamanho= "11">
            <input id="password_confirmation" type="password" v-model="password_confirmation">
            <label for="password_confirmation">confirm password</label>
          </grid-vue>

          <div class="row">
            <grid-vue class="input-field" tamanho= "2">
              <a class="btn waves-effect waves-light" v-on:click="cadastrar()">Cadastrar</a> 
            </grid-vue>
            <grid-vue class="input-field" tamanho="4 offset-s5">
              <p class="margin medium-small">
                <router-link to="/login">Já tenho cadastro</router-link>
              </p>
            </grid-vue>
          </div>    
          

          

        </form>
      </span>
    </login-template>
  </span>
</template>

<script>

import GridVue from '@/components/layouts/GridVue'
import LoginTemplate from '@/templates/LoginTemplate'

export default {
  name: 'Cadastro',
  data () {
      return{
        name: '',
        email: '',
        description: '',
        password: '',
        password_confirmation:''
      }
  },
  components:{
    GridVue,
    LoginTemplate,
  },
  methods:{
    cadastrar(){
      console.log('foi?');
      this.$http.post(this.$url+`cadastro`, {
        name: this.name,
        email: this.email,
        description: this.description,
        password: this.password,
        password_confirmation: this.password_confirmation
      })
      .then(response => {
        console.log(response.data.token);
        if(response.data.token){ //logado
          sessionStorage.setItem('usuario', JSON.stringify(response.data))
          this.$router.push('/');
        }else if(response.data.status == false){ //dados invalidos
          alert('email ou senha invalido')
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
