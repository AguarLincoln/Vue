import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Cadastro from '@/pages/Cadastro'
import Conta from '@/pages/Conta'
import Pagina from '@/pages/Pagina'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: Cadastro
    },
    {
      path: '/conta',
      name: 'conta',
      component: Conta
    },
    {
      path: '/pagina/:id/:nome?',
      name: 'Pagina',
      component: Pagina
    },
    
  ]
})
