<template>
  <div class="box columns is-vcentered p-0 my-6">
    <router-link :to="{name: 'FicheMembre', params: { id: membre.id }}" class="column ml-4 is-flex is-align-items-center">
      <img :src="mailtoMD5" class="mr-4" id="profilPicture" alt="Photo de profil">
      <p class="is-size-5">{{ membre.fullname }} <span class="is-size-6 ml-3">{{ membre.email }}</span></p>
    </router-link>
    <div class="column is-1 has-text-centered" v-if="membre.id !== $store.state.member.id">
      <button @click="funcDelete(membre.id, membre.fullname)" class="delete is-medium"></button>
    </div>
  </div>
</template>

<script>
import md5 from "crypto-js/md5";

export default {
  name: "affichageMembres",
  props: ["membre", "funcDelete"],
  computed: {
    mailtoMD5() {
      let mail = md5(this.membre.email).toString()
      return 'https://www.gravatar.com/avatar/' + mail + '?d=identicon'
    }
  }
}
</script>

<style scoped>
#profilPicture{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>