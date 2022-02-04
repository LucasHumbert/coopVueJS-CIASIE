<template>
  <!-- Message envoyé par un utilisateur différent de celui connecté -->
  <div v-if="message.member_id !== $store.state.member.id" class="box mt-5 column is-5">
    <router-link :to="{name:'FicheMembre', params:{id: message.auteur.id }}" v-if="message.auteur" class="is-underlined">{{ message.auteur.fullname }}</router-link>
    <p v-else class="is-underlined">Utilisateur supprimé</p>
    <p class="my-3 px-2 messageText">{{ message.message }}</p>
    <p v-if="message.created_at === message.modified_at" class="is-size-7 has-text-right">Écrit le {{ message.created_at }}</p>
    <p v-else class="is-size-7 has-text-right">Modifié le {{ message.modified_at }}</p>
  </div>

  <!-- Message envoyé par l'utilisateur connecté -->
  <transition v-else-if="display" name="fade">
    <div class="box mt-5 column is-5 is-offset-7 has-background-info has-text-right has-text-white">
      <div class="is-flex is-justify-content-space-between">
        <p v-if="!editing" class="messageText has-text-left my-3 px-2">{{ message.message }}</p>
        <form v-else @submit.prevent="modifMessage(message.id ,message.message)" class="is-flex is-justify-content-center mb-2">
          <b-input type="text" v-model="message.message" autofocus></b-input>
          <button class="button"><i class="fas fa-check"></i></button>
        </form>
        <div>
          <div v-if="!editing" class="is-flex is-align-items-start">
            <button @click="editing = true" class="editButtons mr-1"><i class="far fa-edit"></i></button>
            <button v-if="!editing" @click="deleteMessage(message.id)" class="delete is-small"></button>
          </div>
          <div v-else class="is-flex is-align-items-start">
            <button @click="editing = false" class="editButtons"><i class="fas fa-arrow-left"></i></button>
          </div>
        </div>
      </div>
      <p v-if="message.created_at === message.modified_at" class="is-size-7 has-text-right">Écrit le {{ message.created_at }}</p>
      <p v-else class="is-size-7 has-text-right">Modifié le {{ message.modified_at }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: "unMessage",
  props: ["message", "id_channel"],
  data() {
    return {
      editing: false,
      display: true
    }
  },
  methods: {
    deleteMessage(id){
      this.$api.delete(`channels/${this.id_channel}/posts/${id}`).then(response => {
        this.$buefy.toast.open(response.data.message)
        this.display = false
      })
    },
    modifMessage(id, messageModif) {
      if (!messageModif){
        this.$buefy.toast.open("Renseigner un message !")
      } else {
        let donnees = {
          message: messageModif
        }
        this.$api.put(`channels/${this.id_channel}/posts/${id}`, donnees).then(response => {
          this.$buefy.toast.open("Message modifié")
          this.editing = false
        })
      }
    }
  }
}
</script>

<style scoped>
.messageText{
  overflow: auto;
  overflow-wrap: break-word;
}
.editButtons{
  background-color: rgba(0,0,0,0);
  border: none;
}

.editButtons i {
  color: white;
}

.editButtons:hover{
  cursor: pointer;
}
</style>