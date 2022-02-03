<template>
<div class="columns">
  <div class="box column is-8 is-offset-2 mt-6 has-text-centered">
    <div class="title mt-4">
      <p v-if="this.membre.id === this.$store.state.member.id">Votre profil</p>
      <p v-else>Profil de {{ this.membre.fullname }}</p>
    </div>
    <div>
      Photo de profil
    </div>
    <div>
      <p>Compte créé le {{ this.created_at }}</p>
      <p>{{ this.membre.email }}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "FicheMembre",
  data() {
    return {
      membre: ""
    }
  },
  mounted() {
    this.membre = this.$store.getters.getMembre(this.$route.params.id)
  },
  computed: {
    created_at(){
      if (this.membre){
        let d = new Date(this.membre.created_at)
        return (
            d.toLocaleDateString("fr-FR") + " à " + d.toLocaleTimeString("fr-FR")
        )
      }
    }
  }
}
</script>