<template>
  <span>
    <login-template>
      <span slot="menu-esquerdo">
        <img class="responsive-img" src="@/assets/logo.png">
      </span>
      
      <span slot="principal">
        
        <form class="login-form">
          <h2>Login</h2>
          <grid-vue class="input-field" tamanho= "11">
            <i class="material-icons prefix">mail_outline</i>
            <input class="validate" id="email" type="email" v-model="email">
            <label for="email" data-error="wrong" data-success="right">Email</label>
          </grid-vue>
        
        
          <grid-vue class="input-field" tamanho= "11">
            <i class="material-icons prefix">lock_outline</i>
            <input id="password" type="password" v-model="password">
            <label for="password">Password</label>
          </grid-vue>
    
          <grid-vue class="input-field" tamanho= "5">
            <a href="#" class="btn waves-effect waves-light" v-on:click="login()">Login</a>
          </grid-vue>

          <grid-vue class="input-field"  tamanho= "6">
            <label>
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
          </grid-vue>
          <div class="row"></div>
          <div class="row">
            <grid-vue class="input-field" tamanho= "5">
              <p class="margin medium-small"><router-link to="/cadastro">Cadastrar-se</router-link></p>
            </grid-vue>
            <grid-vue class="input-field" tamanho= "">
                <p class="margin right-align medium-small"><a href="#">Esqueceu a senha?</a></p>
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
  name: 'Login',
  data () {
      return{
        email: '',
        password: ''
      }
  },
  components:{
    GridVue,
    LoginTemplate,
  },
  methods:{
    login(){
      console.log('foi?');
      this.$http.post(this.$url+`login`, {
        email: this.email,
        password: this.password
      })
      .then(response => {
        console.log(response.data.token);
        if(response.data.token){ //logado
          console.log('logado')
          sessionStorage.setItem('usuario', JSON.stringify(response.data))
          this.$router.push('/');
        }else if(response.data.status == false){ //dados invalidos
          alert('email ou senha invalido')
        }else{ //erros de validação
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
