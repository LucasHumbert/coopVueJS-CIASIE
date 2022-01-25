<template>
  <div class="columns is-multiline">
    <form @submit.prevent="connexion" class="box column is-half is-offset-one-quarter mt-6">
      <h1 class="title is-4 has-text-centered">Se connecter</h1>
      <b-field label="Email">
        <b-input type="email" maxlength="30" v-model="email" required>
        </b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password" v-model="password" required>
        </b-input>
      </b-field>

      <div class="has-text-centered mt-5 mb-3">
        <button class="button">Valider</button>
      </div>
    </form>
    <div class="column is-half is-offset-one-quarter">
      <b-message auto-close type="is-danger" class="has-text-centered" v-if="this.state" v-model="errorIsActive" :duration="errorDuration">
        {{ this.state }}
      </b-message>
    </div>
  </div>
</template>

<script>
export default {
  name: "Connexion",
  mounted() {
    if (this.$store.state.connexionToken) {
      this.$router.push('/')
    }
  },
  data() {
    return {
      email: "lucs@test.com",
      password: "mdp123",
      state: "",
      errorIsActive: false,
      errorDuration: 3500
    }
  },
  methods: {
    connexion() {
      let donnees = {
        email: this.email,
        password: this.password
      }
      this.$api.post('members/signin', donnees)
          .then(response => {
            this.$store.commit('setToken', response.data.token)
            this.$store.commit('setMember', response.data.member)
            this.$router.push('/')
          }).catch(error => {
        this.state = error.response.data.message
        this.errorIsActive = true
      })
    }
  }
}
</script>

<style scoped>

</style>