<script setup>
import { onMounted, ref } from 'vue'
import AuthorList from '@/components/AuthorList.vue'
import axios from "@/config"

const allAuthors = ref([])

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1`;

onMounted(async () => {
  await axios.get(`${baseUrl}/authors`)
    .then(res => { allAuthors.value = res.data.results })
    .catch(error => { console.log(error) })
})

</script>

<template>
  <main class="authors">
    <header class="d-flex justify-content-between align-items-center mb-3">
      <h1 class="authors__title">Все авторы</h1>
      <router-link to="/authors/add" class="btn btn-primary" role="button">Добавить автора</router-link>
    </header>
    <author-list :authors="allAuthors" />
  </main>
</template>

<style lang="scss" scoped>
.authors {
  &__title {
    font-size: 46px;
  }
}
</style>