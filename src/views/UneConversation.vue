<template>
<div id="conversation" class="columns is-multiline is-flex is-flex-direction-column is-justify-content-space-between">
  <div class="box column is-10 is-offset-1 has-text-centered">
    <div class="has-text-right">
      <button id="editButton" @click="editingConv = !editingConv">
        <i v-if="!editingConv" class="far fa-edit"></i>
        <i v-else class="fas fa-arrow-left"></i>
      </button>
    </div>
    <div v-if="!editingConv">
      <h1 class="title">{{ this.conv.label }}</h1>
      <h2 class="subtitle mb-2">{{ this.conv.topic }}</h2>
      <p class="mb-2">{{this.messages.length}} messages</p>
      <p class="is-size-7">Créé le: {{ this.conv.created_at }} <span v-if="this.conv.created_at !== this.conv.modified_at">| Modifié le: {{ this.conv.modified_at }}</span></p>
    </div>
    <form v-else @submit.prevent="editConv(conv.id, conv.label, conv.topic)" class="columns is-multiline">
      <b-field horizontal label="Label" class="column is-4 is-offset-4 mb-1 p-1">
        <b-input type="text" v-model="conv.label" autofocus>
        </b-input>
      </b-field>

      <b-field horizontal label="Topic" class="column is-4 is-offset-4 mb-1 p-1">
        <b-input type="text" v-model="conv.topic" autofocus>
        </b-input>
      </b-field>

      <button class="button"><i class="fas fa-check"></i></button>
    </form>
  </div>
  <div id="chatbox" class="box px-5 column is-10 is-offset-1 is-flex is-flex-grow-2 is-flex-direction-column-reverse">
    <div v-for="message in messages" class="columns mb-2">
      <un-message :message="message" :id_channel="id_channel"></un-message>
    </div>
  </div>
  <div class="box column is-10 is-offset-1">
    <form @submit.prevent="envoyerMessage" class="is-flex">
      <b-input type="text" style="width: 100%;" v-model="nvMessage" autofocus grouped>
      </b-input>
      <button class="button"><i class="far fa-paper-plane"></i></button>
    </form>
  </div>
</div>
</template>

<script>
import unMessage from "@/components/unMessage";

export default {
  name: "UneConversation",
  components:{
    unMessage
  },
  data(){
    return{
      id_channel: this.$route.params.id,
      conv: [],
      messages: [],
      members: [],
      nvMessage: "",
      editingConv: false
    }
  },
  mounted() {
    this.$api.get(`members`).then(response => {
      this.members = response.data;
    })
    this.$api.get(`channels/${this.id_channel}`).then(response => {
      this.conv = response.data;
    })
    this.$api.get(`channels/${this.id_channel}/posts`).then(response => {
      this.messages = response.data;
      this.messages.forEach(message => {
        message['auteur'] = this.recupAuteur(message.member_id)
      })
    })

  },
  methods:{
    envoyerMessage(){
      if (!this.nvMessage){
        this.$buefy.toast.open('Renseigner un message !')
      } else {
        let donnees = {
          channel_id: this.id_channel,
          member_id: this.$store.state.member.id,
          message: this.nvMessage
        }
        this.$api.post(`channels/${this.id_channel}/posts`, donnees).then(response => {
          this.messages.unshift(response.data)
          this.nvMessage = "";
        })
      }
    },
    recupAuteur(idMessage){
      let returnValue;
      this.members.forEach(member => {
        if (member.id === idMessage){
          returnValue = member
        }
      })
      return returnValue;
    },
    editConv(id, label, topic){
      if (!label) {
        this.$buefy.toast.open("Renseigner un label !")
      } else if (!topic) {
        this.$buefy.toast.open("Renseigner un topic !")
      } else {
        let donnees = {
          label: label,
          topic: topic
        }
        this.$api.put(`channels/${this.id_channel}`, donnees).then(response => {
          this.$buefy.toast.open("Conversation modifié")
          this.editingConv = false
        })
      }
    }
  }
}
</script>

<style scoped>
#conversation{
  height: calc(100vh - 110px);
}
#chatbox{
  height: calc(100vh - 400px);
  overflow-y: scroll;
}
#editButton{
  border: none;
  background-color: rgba(0,0,0,0);
}
#editButton:hover{
  cursor: pointer;
}

</style>