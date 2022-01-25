<template>
<div class="columns">
  <div class="column is-10 is-offset-1 py-5">
    <h1 class="title is-3 has-text-centered">Liste des membres</h1>
    <div v-for="membre in membres">
      <affichage-membres :membre="membre" :func-delete="deleteUser"></affichage-membres>
    </div>
  </div>
</div>
</template>

<script>
import affichageMembres from "@/components/affichageMembres";
export default {
  name: "Membres",
  components: {
    affichageMembres
  },

  data() {
    return {
      membres: []
    }
  },
  mounted() {
    this.$api.get('members').then(response => {
      this.membres = response.data
    })
  },
  methods:{
    deleteUser(id, name){
      this.$buefy.dialog.confirm({
        message: `Supprimer l'utilisateur ${name} ?`,
        onConfirm: () => {
          this.$api.delete('members/' + id).then(response => {
            this.$buefy.toast.open('Utilisateur supprimé')
            this.$api.get('members').then(response => {
              this.membres = response.data
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>