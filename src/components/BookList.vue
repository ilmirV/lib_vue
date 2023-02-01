<script setup>
import Book from '@/components/Book.vue'

const props = defineProps({
    books: {
        required: true
    }
})
</script>

<template>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gx-1 gy-5">
        <Book v-for="book of books" :key="book.id" :id="book.id" :img="book.image" :title="book.title"
        :authors="book.authors" />
    </div>
</template>

<style lang="scss" scoped>
.row {
    margin-bottom: 50px;
}
</style>