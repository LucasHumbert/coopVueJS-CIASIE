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
      {{ this.membre.email }}
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
    this.$api.get('members').then(response => {
      this.membre = response.data.find(el => el.id === this.$route.params.id)
    })
  }
}
</script>