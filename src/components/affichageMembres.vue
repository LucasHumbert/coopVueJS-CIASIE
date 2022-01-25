<template>
  <div class="box columns is-vcentered p-0 my-6">
    <router-link :to="{name: 'FicheMembre', params: { id: membre.id }}" class="column ml-4">
      <p class="mb-2 is-size-5">{{ membre.fullname }} <span class="is-size-6 ml-3">{{ membre.email }}</span></p>
    </router-link>
    <div class="column is-1 has-text-centered" v-if="membre.id !== $store.state.member.id">
      <button @click="funcDelete(membre.id, membre.fullname)" class="delete is-medium"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "affichageMembres",
  props: ["membre", "funcDelete"]
}
</script>

<style scoped>

</style>