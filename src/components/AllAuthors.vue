<script setup>
import { onMounted, ref } from 'vue'
import AuthorList from '@/components/AuthorList.vue'
import axios from "@/config"

const authors = ref([])

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1`;

onMounted(async () => {
  await axios.get(`${baseUrl}/authors`)
  .then(res => { authors.value = res.data.results })
  .catch(error => { console.log(error) })
})

</script>

<template>
    <section class="popular-books">
        <div class="popular-books__top">
            <h2 class="heading-2">Авторы</h2>
            <router-link to="/authors">Все авторы <font-awesome-icon icon="fa-solid fa-chevron-right" /></router-link>
        </div>
        <AuthorList :authors="authors.slice(0, 4)" />
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
}
</style>