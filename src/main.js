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
    usuario:  sessionStorage.getItem('usuario')? JSON.parse(sessionStorage.getItem('usuario')): null,
    linhaDoTempo: []
  },
  getters: {
    getUsuario: state => {
      return state.usuario;
    },
    getToken: state => {
      return state.usuario.token;
    },
    getLinhaDoTempo: state => {
      return state.linhaDoTempo;
    }
  },
  mutations:{
    setUsuario(state, value){
      state.usuario = value;
    },
    setLinhaDoTempo(state, value){
      state.linhaDoTempo = value;
    },
    setPaginacao(state,lista){
      for(let item of lista){
        state.linhaDoTempo.push(item);
      }
    }
  }
});

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
