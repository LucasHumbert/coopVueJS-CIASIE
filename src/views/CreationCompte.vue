<template>
  <div class="columns is-multiline">
    <form @submit.prevent="validation" class="box column is-half is-offset-one-quarter mt-6">
      <h1 class="title is-4 has-text-centered">Créer un compte</h1>
      <b-field label="Fullname" class="mb-5">
        <b-input type="text" v-model="fullname" required>
        </b-input>
      </b-field>

      <b-field label="Email">
        <b-input type="email" maxlength="30" v-model="email" required>
        </b-input>
      </b-field>

      <b-field label="Mot de passe">
        <b-input type="password" v-model="password" required>
        </b-input>
      </b-field>

      <b-field label="Vérification du mot de passe" class="mt-5">
        <b-input type="password" v-model="passwordVerif" required>
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
  name: "CreationCompte",
  data() {
    return {
      fullname: 'Lucas Humbert',
      email: 'lucs@test.com',
      password: 'mdp123',
      passwordVerif: 'mdp123',
      state: '',
        errorIsActive: false,
        errorDuration: 3500
    }
  },
  methods: {
    validation() {
      if (this.password !== this.passwordVerif){
        this.state = "Les mots de passe ne correspondent pas !"
        this.errorIsActive = true
      } else {
        let donnees = {
          fullname: this.fullname,
          email: this.email,
          password: this.password,
        }
        this.$api.post('members', donnees)
            .then(response => {
              this.$router.push('/connexion')
            }).catch(error => {
          this.state = error.response.data.message
          this.errorIsActive = true
        })
      }
    }
  }
}
</script>

<style scoped>

</style>