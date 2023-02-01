<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/config';
import ModalReview from "@/components/ModalReview.vue";

const route = useRoute()

const showModal = ref(false)

const bookId = ref('')
const book = ref({})

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1`;

onMounted(async () => {
  bookId.value = route.params.id
  await axios.get(`${baseUrl}/books/${bookId.value}`)
    .then(res => { book.value = res.data })
    .catch(error => { console.log(error) });
})
</script>

<template>
  <div class="book_detail">
    <div class="mb-5">
      <div class="row">
        <div class="col-md-4 book-container">
          <div class="book">
            <img :alt="book.title" :src="book.image" />
          </div>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h4 class="headline-3 card-title">{{ book.title }}</h4>
            <h5 v-for="author of book.authors" :key="author.id" class="book_author card-subtitle">
              <router-link :to="`/authors/${author.id}`">{{ author.first_name }} {{ author.last_name }}</router-link>
            </h5>
            <div class="book-rate">
              <span>&star;</span>
              <span>&star;</span>
              <span>&star;</span>
              <span>&star;</span>
              <span>&star;</span>
            </div>
            <p class="book_summary card-text">
              <span v-html="book.summary"></span>
            </p>
            <span class="book_isbn">ISBN: {{ book.isbn }}</span>
            <span class="book_genre" v-for="(genre, i) of book.genre" :key="i">{{ genre.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <section class="reviews">
      <header class="d-flex justify-content-between pb-3 border-2 border-bottom">
        <h3>Отзывы <span style="color: #ff4a74;">145</span></h3>
        <button class="btn btn-outline-primary" id="show-modal" @click="showModal = true">Оставить отзыв</button>
      </header>
      <article v-for="review of book.review_set" :key="review.id" class="blog-post">
        <h2 class="blog-post-title mb-1">{{ review.title }}</h2>
        <p class="blog-post-meta">{{ review.pub_date }} by <b>{{ review.author.username }}</b></p>
        <p>{{ review.review_text }}</p>
      </article>
    </section>

    <Teleport to="body">
      <ModalReview :show="showModal" @close="showModal = false"></ModalReview>
    </Teleport>
    <!-- <h3>Копии:</h3>
    <div v-for="copy of book.bookinstance_set" :key="copy.id">
      <p class="text-danger" v-if="copy.status === 'm'">На обслуживании</p>
      <p class="text-warning" v-else-if="copy.status === 'o'">На руках</p>
      <p class="text-success" v-else-if="copy.status === 'a'">Доступна</p>
      <p class="text-warning" v-else>Зарезервирована</p>
      <p><b>Издательство: </b>{{ copy.imprint }}</p>
      <p><b>Id: </b>{{ copy.id }}</p>
      <hr />
    </div> -->
  </div>

</template>

<style lang="scss" scoped>
.book_detail {
  margin-top: 60px;
}

.book-container {
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 600px;
}

@keyframes initAnimation {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(-30deg);
  }
}

.book {
  width: 215px;
  height: 323px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateY(-30deg);
  transition: 1s ease;
  animation: 1s ease 0s 1 initAnimation;
}

.book:hover {
  transform: rotateY(0deg);
}

.book > :first-child {
  position: absolute;
  top: 0;
  left: 0;
  background-color: red;
  width: 215px;
  height: 323px;
  transform: translateZ(25px);
  background-color: #01060f;
  border-radius: 0 2px 2px 0;
  box-shadow: 5px 5px 20px #666;
}

.book::before {
  position: absolute;
  content: ' ';
  background-color: blue;
  left: 0;
  top: 3px;
  width: 48px;
  height: 317px;
  transform: translateX(187px) rotateY(90deg);
  background: linear-gradient(90deg, 
    #fff 0%,
    #f9f9f9 5%,
    #fff 10%,
    #f9f9f9 15%,
    #fff 20%,
    #f9f9f9 25%,
    #fff 30%,
    #f9f9f9 35%,
    #fff 40%,
    #f9f9f9 45%,
    #fff 50%,
    #f9f9f9 55%,
    #fff 60%,
    #f9f9f9 65%,
    #fff 70%,
    #f9f9f9 75%,
    #fff 80%,
    #f9f9f9 85%,
    #fff 90%,
    #f9f9f9 95%,
    #fff 100%
    );
}

.book::after {
  position: absolute;
  top: 0;
  left: 0;
  content: ' ';
  width: 215px;
  height: 323px;
  transform: translateZ(-25px);
  background-color: #01060f;
  border-radius: 0 2px 2px 0;
  box-shadow: -10px 0 50px 10px #666;
}

.card-title {
  margin-bottom: 8px;
}

.card-subtitle {
  margin-bottom: 25px;
  font-size: 16px;

  a {
  color: #8A8894;
  }
  &:hover {
    text-decoration: underline;
  }
}

.book-rate {
  margin-bottom: 30px;
}
</style>