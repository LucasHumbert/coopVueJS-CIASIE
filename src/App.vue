<template>
  <div id="app">
    <b-navbar class="box p-2">
      <template #brand>
        <b-navbar-item class="title is-2 m-0">
          Coop
        </b-navbar-item>
      </template>
      <template #start v-if="$store.state.connexionToken">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          Conversations
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/membres' }">
          Membres
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons" v-if="!$store.state.connexionToken">
            <router-link to="/creation-compte" class="button is-light mr-3">
              Créer un compte
            </router-link>
            <router-link to="/connexion" class="button is-primary">
              <strong>Se connecter</strong>
            </router-link>
          </div>

          <div v-else>
            <router-link :to="{name: 'FicheMembre', params: { id: $store.state.member.id }}" class="button is-light mr-3">Bonjour {{ $store.state.member.fullname }}</router-link>
            <button @click="deconnexion" class="button is-primary">Deconnexion</button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('setReady', false)

    if (!this.$store.state.connexionToken) {
      this.seConnecter()
    } else {
      this.$api.get(`members/${this.$store.state.member.id}/signedin`)
      .then(this.demarrer)
      .catch(this.seConnecter)
    }
  },
  methods: {
    ready(){
      this.$store.commit('setReady', true);
    },
    demarrer(){
      this.$api.get('members').then(response => {
        this.$store.commit('setMembers', response.data)
      })
      this.ready();
    },
    seConnecter(){
      this.$store.commit('setToken', false)
      this.$router.push('/connexion')
      this.ready();
    },
    deconnexion(){
      this.$api.delete('members/signout')
        .then(response => {
          this.$store.commit('setToken', false)
          this.$store.commit('setMember', false)
          this.$router.push('/connexion')
        })
    }
  }
}
</script>

<style>
body{
  height: 100vh;
}
#app{
  height: 100vh;
  max-height: 100vh;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
