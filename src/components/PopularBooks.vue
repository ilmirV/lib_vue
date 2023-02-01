<script setup>
import { onMounted, ref } from 'vue'
import BookList from '@/components/BookList.vue'
import axios from '@/config'

const popularBooks = ref([])

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1`;

onMounted(async () => {
  await axios.get(`${baseUrl}/books`)
    .then(res => { popularBooks.value = res.data.results })
    .catch(error => { console.log(error) })
})

</script>

<template>
  <section class="popular-books">
    <div class="popular-books__top">
      <h2 class="heading-2">Самые читаемые книги</h2>
      <router-link to="/books">Все книги <font-awesome-icon icon="fa-solid fa-chevron-right" /></router-link>
    </div>
    <span class="popular-books__summary">
      {{ popularBooks.length }}
      <span v-if="popularBooks.length % 10 === 1 ">книга</span>
      <span v-else-if="popularBooks.length % 10 > 1 && popularBooks.length % 10 < 5">книги</span>
      <span v-else>книг</span>
    </span>
    <BookList :books="popularBooks.slice(0, 4)" />
  </section>
</template>

<style lang="scss" scoped>
.popular-books {
  margin-top: 30px;
  margin-bottom: 24px;
  padding: 10px 20px;
  border-radius: 15px;
  background: #ffffff;

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 20px;
    font-weight: 600px;
    line-height: 28px;
  }

  &__summary {
    display: block;
    margin-bottom: 8px;
    line-height: 24px;
    color: #4f4f4f;
  }
}
</style>