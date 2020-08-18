// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import axios from 'axios';
import router from './router'
import VueAxios from 'vue-axios';

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$url = 'http://127.0.0.1:8000/api/'

var store = new Vuex.Store({
  state:{
    nome: 'Lincoln',
    sobrenome: 'Aguiar'    
  },
  getters: {
    getNome: state => {
      return state.nome;
    },
    getNomeCompleto: state => {
      return state.nome + ' ' + state.sobrenome
    }
  },
  mutations:{
    setNome(state, nome){
      state.nome = nome;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
