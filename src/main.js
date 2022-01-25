import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.prototype.$api = axios.create({
  baseURL : 'https://allweb.fun/coop/api/',
  params: {},
  headers: {'Authorization': "5fcad6c9051fce9e90c175ce5f8624c33ff1a4c8"}
});

Vue.prototype.$api.interceptors.request.use(function (config){
  if (store.state.connexionToken){
    config.params.token = store.state.connexionToken
  }
  return config
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
