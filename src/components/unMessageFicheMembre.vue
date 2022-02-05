<template>
  <div v-if="conversation.id">
    <router-link :to="{name: 'UneConversationEnContexte', params: { id: conversation.id, idMessage: message.id }}" class="box p-4 mb-5">
      <div class="has-text-left is-size-6">
        Dans <span class="has-text-weight-bold">{{ conversation.label}}</span>
      </div>
      <div class="is-size-5">
        {{ message.message }}
      </div>
      <div class="has-text-right">
        <span v-if="message.created_at === message.modified_at">Écrit le {{ message.created_at }}</span>
        <span v-else>Modifié le {{ message.modified_at}}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "unMessageFicheMembre",
  props: ['message'],
  data() {
    return {
      conversation: []
    }
  },
  mounted() {
    this.$api.get(`channels/${this.message.channel_id}`).then(response => {
      this.conversation = response.data
    })
  }
}
</script>

<style scoped>

</style>