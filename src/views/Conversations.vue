<template>
<div class="columns">
  <div class="column is-10 is-offset-1 py-5">
    <h1 class="title is-3 has-text-centered mb-3">Conversations</h1>
    <div class="has-text-centered">
      <router-link to="/nouvelle-conv" class="button is-primary">
        Créer une conversation
      </router-link>
    </div>
    <template v-for="conv in convs">
      <affichage-conversations :conv="conv"></affichage-conversations>
    </template>
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

  }
}
</script>

<style scoped>

</style>