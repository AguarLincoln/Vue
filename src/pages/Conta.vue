<template>
  <span>
    <site-template>
      <span slot="menu-esquerdo">
        <img class="responsive-img" :src="usuario.image">
      </span>
      
      <span slot="principal">
        <h2>Conta</h2>

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
            <input class="validate" id="email" type="email" :value="email">
            <label data-error="wrong" data-success="right">Email</label>
          </grid-vue>
          
          <grid-vue class="file-field input-field" tamanho= "11">
            <div class="btn">
              <span>File</span>
              <input type="file" v-on:change="salvarImg">
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text">
            </div>
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
              <a class="btn waves-effect waves-light" v-on:click="atualizar()">Atualizar</a> 
            </grid-vue>
            
          </div>    
          

          

        </form>
      </span>
    </site-template>
  </span>
</template>

<script>
import GridVue from '@/components/layouts/GridVue'
import SiteTemplate from '@/templates/SiteTemplate'

export default {
  name: 'Conta',
  props: [],
  data () {
      return{
        usuario: false,
        name: '',
        email: '',
        token: '',
        description:'',
        image: '',
        password: '',
        password_confirmation:''
      }
  },
  components:{
    GridVue,
    SiteTemplate,
  },
  created(){
    let usuarioSession = this.$store.getters.getUsuario;
    if(usuarioSession){
      this.usuario = this.$store.getters.getUsuario;
      this.name = this.usuario.name 
      this.image = this.usuario.image
      this.email = this.usuario.email
      this.description = this.usuario.description
      this.password = this.usuario.password
      this.token =this.usuario.token
    
    }
  },
  methods:{

    salvarImg(e){

      let arquivo = e.target.files || e.dataTransfer.files;
      if(!arquivo.length){
        console.log('Tam = 0')
        return;
      }

      let reader = new FileReader();
      reader.onloadend = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(arquivo[0]);
      
      
      
    },

    atualizar(){
      console.log('foi?');
      this.$http.put(this.$url+`conta`, {
        name: this.name,
        email: this.email,
        image: this.image,
        description:  this.description,
        password: this.password,
        password_confirmation: this.password_confirmation,
      },{"headers": {"Authorization":"Bearer "+this.$store.getters.getToken}})
      .then(response => {
      
        this.usuario = response.data.usuario
        if(response.data.status){ //logado
          console.log('Criado')
          this.$store.commit('setUsuario', response.data.usuario)
          sessionStorage.setItem('usuario', JSON.stringify(response.data.usuario))
          alert('Atualizado com sucesso')
        }else if(response.data.status == false && response.data.validacao){ //erros de validação
          console.log(this.imagem)  
          let erros = 'Error = ';
          for(let erro of Object.values(response.data.erros)){
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
