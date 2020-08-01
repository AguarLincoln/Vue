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
            <input class="validate" id="email" type="email">
            <label for="email" data-error="wrong" data-success="right">Nome</label>
          </grid-vue>
          
          <grid-vue class="input-field" tamanho= "11">
            <input class="validate" id="email" type="email">
            <label for="email" data-error="wrong" data-success="right">Email</label>
          </grid-vue>
        
        
          <grid-vue class="input-field" tamanho= "11">
            <input id="password" type="password">
            <label for="password">Password</label>
          </grid-vue>
    
          <div class="row">
            <grid-vue class="input-field" tamanho= "5">
              <router-link to="/cadastro" class="btn waves-effect waves-light">Cadastro</router-link> 
            </grid-vue>
            <grid-vue class="input-field" tamanho= "">
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
    GridVue,
    LoginTemplate,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
