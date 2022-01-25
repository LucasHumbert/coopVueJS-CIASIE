import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connexionToken: "",
    member: false
  },
  mutations: {
    setToken(state, token){
      state.connexionToken = token
    },
    setMember(state, member) {
      state.member = member
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
