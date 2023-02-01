<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthorDetail from '@/components/AuthorDetail.vue'
import axios from "@/config"

const route = useRoute()
const router = useRouter()

const authorId = ref('')
const currentAuthor = ref({})

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1`;

onMounted(async () => {
  authorId.value = route.params.id
  await axios.get(`${baseUrl}/authors/${authorId.value}`)
  .then(res => { currentAuthor.value = res.data })
  .catch(error => { console.log(error) })
})
</script>

<template>
  <div class="book_detail">
    <AuthorDetail :author="currentAuthor" />
  </div>
</template>

<style lang="scss" scoped>

</style>