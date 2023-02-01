<script setup>
import { onMounted, ref } from 'vue'
import BookList from '@/components/BookList.vue'
import axios from '@/config';

const allBooks = ref([])
const pages = ref()
const nextPage = ref('')
const previousPage = ref('')
const activePage = ref(1)

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1`;

onMounted(async () => {
  await axios.get(`${baseUrl}/books/`)
  .then(res => {
    allBooks.value = res.data.results;
    pages.value = Math.ceil(res.data.count / 10);
    nextPage.value = res.data.next;
    previousPage.value = res.data.previous;
  })
  .catch(error => { console.log(error) })
})

const getPage = (pageURL) => {
  axios.get(pageURL)
    .then((res) => {
      allBooks.value = res.data.results;
      nextPage.value = res.data.next;
      previousPage.value = res.data.previous;
    })
}
</script>

<template>
  <div class="album d-fle flex-colum">
    <div class="container text-center lex-grow-1">
      <h2 class="section-title headline-3">Книги</h2>
      <span class="books-counter">{{ allBooks.length }}</span>
      <BookList :books="allBooks" />
    </div>

    <nav class="pagination-wrapper" aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: !previousPage }">
            <button class="page-link" @click="getPage(previousPage), activePage--">Назад</button>
          </li>
          <li v-for="n in pages" class="page-item">
            <button class="page-link" :class="{ active: n === activePage }" @click="getPage(`${baseUrl}/books/?page=${n}`), activePage = n">{{ n }}</button>
          </li>
          <li class="page-item" :class="{ disabled: !nextPage }">
            <button class="page-link" @click="getPage(nextPage), activePage++">Вперед</button>
          </li>
        </ul>
      </nav>

  </div>
</template>

<style lang="scss" scoped>
.section-title {
  margin-bottom: 0;
}

.books-counter {
  display: block;
  margin-bottom: 40px;
  font-size: 20px;
  color: #8A8894;
}

// .pagination-wrapper {
//   position: absolute;
//   top: 900px;
// }
</style>
