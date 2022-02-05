<template>
<div class="columns is-multiline">
  <div class="box column is-8 is-offset-2 mt-6 has-text-centered">
    <div class="title mt-4">
      <p v-if="this.membre.id === this.$store.state.member.id">Votre profil</p>
      <p v-else>Profil de {{ this.membre.fullname }}</p>
    </div>
    <div>
      <img :src="mailtoMD5" class="mb-4" id="profilPicture" alt="Photo de profil">
    </div>
    <div>
      <p>{{ this.membre.email }}</p>
      <p>Compte créé le {{ this.created_at }}</p>
    </div>
  </div>

  <div class="box column is-8 is-offset-2 mt-3 mb-5 has-text-centered">
    <div v-if="this.nbLastMessages > 0">
      <p class="title mt-4">{{ this.nbLastMessages }} derniers messages</p>
      <template v-for="message in lastMessages.slice(0, this.nbLastMessages)">
        <un-message :message="message"></un-message>
      </template>
    </div>
    <div v-else>
      <p class="title mt-4">Aucun message</p>
    </div>
  </div>
</div>
</template>

<script>
import unMessage from "@/components/unMessageFicheMembre";
import md5 from 'crypto-js/md5'
export default {
  name: "FicheMembre",
  components: {
    unMessage
  },
  data() {
    return {
      membre: "",
      nbLastMessages: 0,
      lastMessages: [],
      array: [4, 8, 3]
    }
  },
  mounted() {
    this.membre = this.$store.getters.getMembre(this.$route.params.id)
    this.getLastMessages()
  },
  methods:{
    getLastMessages(){
      this.$api.get('channels').then(response => {
        response.data.forEach(conv => {
          this.$api.get(`channels/${conv.id}/posts`).then(response => {
            response.data.forEach(message => {
              if (message.member_id === this.membre.id){
                this.lastMessages.push(message)
                this.nbLastMessages++
              }
            })
          })
        })
      })
    }
  },
  computed: {
    created_at(){
      if (this.membre){
        let d = new Date(this.membre.created_at)
        return (
            d.toLocaleDateString("fr-FR") + " à " + d.toLocaleTimeString("fr-FR")
        )
      }
    },
    mailtoMD5() {
      let mail = md5(this.membre.email).toString()
      return 'https://www.gravatar.com/avatar/' + mail + '?d=identicon'
    }
  }
}
</script>

<style scoped>
#profilPicture{
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
