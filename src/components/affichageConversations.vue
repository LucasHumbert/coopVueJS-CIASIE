<template>
  <transition v-if="display" name="fade">
    <div class="box columns is-vcentered p-0 my-6">
      <router-link :to="{name: 'UneConversation', params: { id: conv.id }}" class="column ml-4">
        <p class="mb-2 is-size-5"><span class="is-size-3">{{ conv.label }}</span> <span class="mx-2">|</span> <span class="is-size-5">{{ conv.topic }}</span></p>
        <p class="m-0 is-size-7">Créé le {{ this.created_at }} <span v-if="this.created_at !== this.modified_at"><span class="mx-2">|</span> Modifié le {{ this.modified_at }}</span></p>
      </router-link>
      <div class="column is-1 has-text-centered">
        <button @click="deleteConv" class="delete is-medium"></button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "affichageConversation",
  props: ["conv"],
  data() {
    return {
      display: true
    }
  },
  methods: {
    deleteConv(){
      this.$buefy.dialog.confirm({
        message: `Supprimer la conversation ${this.conv.label} ?`,
        onConfirm: () => {
          this.$api.delete('channels/' + this.conv.id).then(response => {
            this.$buefy.toast.open('Conversation supprimée')
            this.display = false
          })
        }
      })
    }
  },
  computed: {
    created_at(){
      if (this.conv){
        let d = new Date(this.conv.created_at)
        return (
            d.toLocaleDateString("fr-FR") + " à " + d.toLocaleTimeString("fr-FR")
        )
      }
    },
    modified_at(){
      if (this.conv){
        let d = new Date(this.conv.modified_at)
        return (
            d.toLocaleDateString("fr-FR") + " à " + d.toLocaleTimeString("fr-FR")
        )
      }
    }
  }
}
</script>

<style scoped>

</style>