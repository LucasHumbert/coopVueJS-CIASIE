<template>
  <div id="app">
    <b-navbar class="box p-2">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }" class="title is-2 m-0">
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
            <p class="button is-light mr-3">Bonjour {{ $store.state.member.fullname }}</p>
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
    this.$api.get('ping').then()
    if (!this.$store.state.connexionToken) {
      this.$router.push('/connexion')
    }
  },
  methods: {
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
</style>
