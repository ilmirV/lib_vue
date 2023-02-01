<script setup>
const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    authors: {
        type: Array,
        required: true
    }
})
</script>

<template>
  <div class="col">
      <div class="book-container card">
        <div class="book">
          <router-link :to="`books/${id}`">
            <img class="card-img-top" :src="img" :alt="title">
          </router-link>
        </div>
      </div>
      
      <!-- <router-link :to="`books/${id}`">
        <img class="card-img-top border rounded" :src="img" :alt="title">
      </router-link> -->
      <div class="">
        <h4 class="book-title text-truncate">
          <router-link :to="`/books/${id}`" class="book_title">{{ title }}</router-link>
        </h4>
        <h5 class="author-name">
          <router-link :to="`/authors/${authors[0].id}`" class="author_name">{{ authors[0].first_name }} {{
            authors[0].last_name
          }}</router-link>
        </h5>
        <div class="book-rate">
          <span>&star;</span>
          <span>&star;</span>
          <span>&star;</span>
          <span>&star;</span>
          <span>&star;</span>
        </div>
      </div>
  </div>
</template>

<style lang="scss" scoped>
.book-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
}

.card-img-top {
  border-radius: 0;
}

.book {
  width: 190px;
  height: 270px;
  position: relative;
  transform-style: preserve-3d;
}

.book:hover {
  transform: scale(1.02);
  transition: 0.3s ease;
}

.book > :first-child {
  position: absolute;
  top: 0;
  left: 0;
  background-color: red;
  width: 180px;
  height: 270px;
  background-color: #01060f;
}

.book::before {
  position: absolute;
  content: ' ';
  background-color: blue;
  left: 0;
  top: 3px;
  width: 10px;
  height: 268px;
  transform: translateX(180px) skewY(-45deg) translateY(-8px);
  box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.2);
  background: linear-gradient(90deg, 
    #fff 0%,
    #f0f0f0 10%,
    #fff 15%,
    #f0f0f0 25%,
    #fff 30%,
    #f0f0f0 40%,
    #fff 45%,
    #f0f0f0 55%,
    #fff 60%,
    #f0f0f0 70%,
    #fff 75%,
    #f0f0f0 85%,
    #fff 90%,
    #f0f0f0 100%
    );
}

.book::after {
  position: absolute;
  top: 0;
  left: 0;
  content: ' ';
  width: 10px;
  height: 180px;
  transform: rotateZ(90deg) skewY(45deg) translate(-95px, 5px);
  box-shadow: -5px 0px 10px rgba(0, 0, 0, 0.2);
  background: linear-gradient(90deg, 
  #fff 0%,
    #f0f0f0 10%,
    #fff 15%,
    #f0f0f0 25%,
    #fff 30%,
    #f0f0f0 40%,
    #fff 45%,
    #f0f0f0 55%,
    #fff 60%,
    #f0f0f0 70%,
    #fff 75%,
    #f0f0f0 85%,
    #fff 90%,
    #f0f0f0 100%
    );
}

.book-title {
  margin-top: 15px;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 300;

  a {
    color: #212121;
  }
}

.author-name {
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 300;

  a {
    color: #8A8894;
  }
}
</style>
