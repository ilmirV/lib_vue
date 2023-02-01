<script setup>
const props = defineProps({
    author: {
        type: Object,
        default: () => {},
        required: true
    }
})
</script>

<template>
    <div class="book">
        <div>
            <img :src="author.image" :alt="author.first_name">
        </div>
        <div>
            <h1 class="book_title">{{ author.first_name }} {{ author.last_name }}</h1>
            <p class="book_summary">Дата рождения: {{ author.date_of_birth }}</p>
            <span class="book_isbn">Дата смерти: {{ author.date_of_death }}</span>
        </div>
    </div>
    <h3>Книги</h3>
    <div v-for="book of author.book_set" :key="book.id">
        <img :src="book.image" alt="">
        <h4>
            <router-link :to="`/books/${book.id}`">{{ book.title }}</router-link>
            <span> ({{ book.bookinstance_set.length }})</span>
        </h4>
        <p v-html="book.summary"></p>
        <hr />
    </div>
</template>

<style lang="scss" scoped>
.book {
    padding: 50px 80px;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 500px;
    column-gap: 65px;
    &_title {
        margin-bottom: 16px;
        font-family: var(--secondary-font);
        font-weight: 400;
        font-size: 36px;
    }
    &_author {
        font-weight: 400;
        font-size: 24px;
        margin-bottom: 28px;
    }
    &_summary {
        border-top: 1px solid lightgray;
        padding-top: 24px;
    }
    &_isbn {
        display: block;
    }
    &_genre {
        display: block;
    }
}
</style>