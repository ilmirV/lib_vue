<script setup>
import BookList from "@/components/BookList.vue";
import AuthorList from "@/components/AuthorList.vue";
import { useSearchStore } from "@/stores/SearchStore";

const searchStore = useSearchStore();
</script>

<template>
  <h2>Результаты поиска</h2>
  <h5>Книги</h5>
  <BookList :books="searchStore.filteredBooks" />
  <h5>Авторы</h5>
  <author-list :authors="searchStore.filteredAuthors" />
</template>