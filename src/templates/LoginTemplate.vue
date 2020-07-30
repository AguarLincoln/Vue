<template>
  <div>
    <header>
      <nav-bar cor="green" url="/" logo="LOGO">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
      </nav-bar>
    </header>
  
  
    <main>
      <div class="container">
        <div class="row">
          <grid-vue tamanho="6">
            
            <slot name="menu-esquerdo"/>
            
            
          </grid-vue>
          
          <grid-vue tamanho="6">
            <slot name="principal"/>
          </grid-vue>
        
        </div>
      </div>
      
    </main>

    
    <footer-vue cor="green" logo="./assets/logo.png" ano="2020" descricao="Description here!">
      <li><a class="grey-text text-lighten-3" href="#!">Home</a></li>
      <li><a class="grey-text text-lighten-3" href="#!">Perfil</a></li>
      <li><a class="grey-text text-lighten-3" href="#!">Page 1</a></li>
      <li><a class="grey-text text-lighten-3" href="#!">Page2</a></li>
    </footer-vue>
    
  </div>
</template>

<script>
import NavBar from '@/components/layouts/NavBar'
import GridVue from '@/components/layouts/GridVue'
import CardMenuVue from '@/components/layouts/CardMenuVue'
import FooterVue from '@/components/layouts/FooterVue'
export default {
  name: 'LoginTemplate',
  components:{
    NavBar,
    FooterVue,
    GridVue,
    CardMenuVue
  }
}
</script>

<style>

</style>