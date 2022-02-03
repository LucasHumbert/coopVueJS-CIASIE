import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ready: false,
    connexionToken: "",
    member: false,
    members: []
  },
  mutations: {
    setReady(state, ready){
      state.ready = ready
    },
    setToken(state, token){
      state.connexionToken = token
    },
    setMember(state, member) {
      state.member = member
    },
    setMembers(state, members) {
      state.members = members
    }
  },
  getters: {
    getMembre: (state) => (idMembre) => {
      return state.members.find(member => member.id === idMembre)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
