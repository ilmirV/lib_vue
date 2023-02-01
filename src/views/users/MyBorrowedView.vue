<script setup>
import { onMounted, ref } from 'vue'
import Book from '@/components/Book.vue'
import axios from '@/config';

const myBorrowed = ref([])

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1`;

onMounted(async () => {
  await axios.get(`${baseUrl}/mybooks`)
  .then(res => { myBorrowed.value = res.data; console.log(res.data) })
  .catch(error => { console.log(error) })
})
</script>

<template>
  <main class="books">
    <h1 class="heading-1">Мои книги</h1>
    <Book
                v-for="item of myBorrowed"
                :key="item.book.id"
                :id="item.book.id"
                :img="item.book.image"
                :title="item.book.title"
                :author="item.book.author" />
    <!-- <BookList :books="myBorrowed" /> -->
  </main>
</template>