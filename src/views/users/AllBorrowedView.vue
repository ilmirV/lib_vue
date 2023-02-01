<script setup>
import { onMounted, ref } from 'vue'
import Book from '@/components/Book.vue'
import axios from '@/config';

const AllBorrowed = ref([])

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1`;

onMounted(async () => {
  await axios.get(`${baseUrl}/allborrowed`)
  .then(res => { AllBorrowed.value = res.data; console.log(res.data) })
  .catch(error => { console.log(error) })
})
</script>

<template>
  <main class="books">
    <h1 class="heading-1">Сейчас на руках</h1>
    <Book v-for="item of AllBorrowed" :key="item.book.id" :id="item.book.id" :img="item.book.image"
      :title="item.book.title" :author="item.book.author" />
  </main>
</template>