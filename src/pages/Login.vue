<template>
  <span>
    <login-template>
      <span slot="menu-esquerdo">
        <img src="@/assets/logo.png" class="responsive-image">
      </span>
      
      <span slot="principal">
        <h2>Login</h2>
        <form class="login-form">
        
          <grid-vue class="input-field" tamanho= "11">
            <i class="material-icons prefix">mail_outline</i>
            <input class="validate" id="email" type="email">
            <label for="email" data-error="wrong" data-success="right">Email</label>
          </grid-vue>
        
        
          <grid-vue class="input-field" tamanho= "11">
            <i class="material-icons prefix">lock_outline</i>
            <input id="password" type="password">
            <label for="password">Password</label>
          </grid-vue>
    
          <grid-vue class="input-field" tamanho= "5">
            <a href="#" class="btn waves-effect waves-light">Login</a>
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
              <p class="margin medium-small"><a href="#">Register Now!</a></p>
            </grid-vue>
            <grid-vue class="input-field" tamanho= "">
                <p class="margin right-align medium-small"><a href="#">Forgot password?</a></p>
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
import CardConteudoVue from '@/components/social/CardConteudoVue'
import ConteudoPost from '@/components/social/ConteudoPost'
import PublicarConteudo from '@/components/social/PublicarConteudo'

export default {
  name: 'Login',
  data () {
      return{

      }
  },
  components:{
    CardConteudoVue,
    ConteudoPost,
    PublicarConteudo,
    GridVue,
    LoginTemplate,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
