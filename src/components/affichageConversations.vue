<template>
  <div class="box columns is-vcentered p-0 my-6">
    <router-link :to="{name: 'UneConversation', params: { id: conv.id }}" class="column ml-4">
      <p class="mb-2 is-size-5"><span class="is-size-3">{{ conv.label }}</span> <span class="mx-2">|</span> <span class="is-size-5">{{ conv.topic }}</span></p>
      <p class="m-0 is-size-7">Créé le {{ conv.created_at }} <span class="mx-2">|</span> Modifié le {{ conv.modified_at }}</p>
    </router-link>
    <div class="column is-1 has-text-centered">
      <button @click="funcDelete(conv.id, conv.label)" class="delete is-medium"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "affichageConversation",
  props: ["conv", "funcDelete"]
}
</script>

<style scoped>

</style>