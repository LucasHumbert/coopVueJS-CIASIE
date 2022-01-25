<template>
<div class="columns">
  <div class="column is-10 is-offset-1 py-5">
    <h1 class="title is-3 has-text-centered mb-3">Conversations</h1>
    <div class="has-text-centered">
      <router-link to="/nouvelle-conv" class="button is-primary">
        Créer une conversation
      </router-link>
    </div>
    <div v-for="conv in convs">
      <affichage-conversations :conv="conv" :funcDelete="deleteConv"></affichage-conversations>
    </div>
  </div>
</div>
</template>

<script>
import affichageConversations from "@/components/affichageConversations";
export default {
  name: "Conversations",
  components: {
    affichageConversations
  },

  data() {
    return {
      convs: ""
    }
  },
  mounted() {
    this.$api.get('channels').then(response => {
      this.convs = response.data
    })
  },
  methods:{
    deleteConv(id, label){
      this.$buefy.dialog.confirm({
        message: `Supprimer la conversation ${label} ?`,
        onConfirm: () => {
          this.$api.delete('channels/' + id).then(response => {
            this.$buefy.toast.open('Conversation supprimée')
            this.$api.get('channels').then(response => {
              this.convs = response.data
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