<script setup>
import { onMounted, ref } from 'vue'
import BookList from '@/components/BookList.vue'
import axios from '@/config'

const popularBooks = ref([])
const l = ref(0)
const movePer = 25.34

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1`;

const nextSlide =  () => {
  l += movePer
}

onMounted(async () => {
  await axios.get(`${baseUrl}/books`)
    .then(res => { popularBooks.value = res.data })
    .catch(error => { console.log(error) })
})

</script>

<template>
  <section class="popular-books main">
    <div class="popular-books__top text">
      <h2 class="heading-2">Самые читаемые книги</h2>
      <router-link to="/books">Все книги <font-awesome-icon icon="fa-solid fa-chevron-right" /></router-link>
    </div>
    <!-- <span class="popular-books__summary">{{ popularBooks.length }} книг</span> -->
    <!-- <div id="carouselExample" class="carousel slide container" data-bs-ride="carousel">
      <div class="carousel-inner w-100">
        <div class="carousel-item active">
          <div class="col-md-3">
            <div class="card card-body">
              <img src="https://via.placeholder.com/640x360?text=1" alt="" class="img-fluid">
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="col-md-3">
            <div class="card card-body">
              <img src="https://via.placeholder.com/640x360?text=2" alt="" class="img-fluid">
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="col-md-3">
            <div class="card card-body">
              <img src="https://via.placeholder.com/640x360?text=3" alt="" class="img-fluid">
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div> -->
    
    <header>
      <h1>Все книги</h1>
      <p>
        <span>&#139;</span>
        <span>&#155;</span>
      </p>
    </header>
    <section class="product_section">
      <div class="product">
        <picture>
          <img src="https://via.placeholder.com/300x400?text=1" alt="">
        </picture>
        <div class="details">
          <p>
            <b>Product One</b>
            <small>New arrival</small>
          </p>
          <samp>$45.00</samp>
        </div>
        <div class="button">
          <p class="star">
            <strong>&star;</strong>
            <strong>&star;</strong>
            <strong>&star;</strong>
            <strong>&star;</strong>
            <strong>&star;</strong>
          </p>
          <a href="#">Add-cart</a>
        </div>
      </div>
      <div class="product">
        <picture>
          <img src="https://via.placeholder.com/300x400?text=2" alt="">
        </picture>
        <div class="details">
          <p>
            <b>Product Two</b>
            <small>New arrival</small>
          </p>
          <samp>$45.00</samp>
        </div>
        <div class="button">
          <p class="star">
            <strong>&star;</strong>
            <strong>&star;</strong>
            <strong>&star;</strong>
            <strong>&star;</strong>
            <strong>&star;</strong>
          </p>
          <a href="#">Add-cart</a>
        </div>
      </div>
      <div class="product">
        <picture>
          <img src="https://via.placeholder.com/300x400?text=3" alt="">
        </picture>
        <div class="details">
          <p>
            <b>Product Three</b>
            <small>New arrival</small>
          </p>
          <samp>$45.00</samp>
        </div>
        <div class="button">
          <p class="star">
            <strong>&star;</strong>
            <strong>&star;</strong>
            <strong>&star;</strong>
            <strong>&star;</strong>
            <strong>&star;</strong>
          </p>
          <a href="#">Add-cart</a>
        </div>
      </div>
      <div class="product">
        <picture>
          <img src="https://via.placeholder.com/300x400?text=4" alt="">
        </picture>
        <div class="details">
          <p>
            <b>Product Four</b>
            <small>New arrival</small>
          </p>
          <samp>$45.00</samp>
        </div>
        <div class="button">
          <p class="star">
            <strong>&star;</strong>
            <strong>&star;</strong>
            <strong>&star;</strong>
            <strong>&star;</strong>
            <strong>&star;</strong>
          </p>
          <a href="#">Add-cart</a>
        </div>
      </div>
      <div class="product">
        <picture>
          <img src="https://via.placeholder.com/300x400?text=5" alt="">
        </picture>
        <div class="details">
          <p>
            <b>Product Five</b>
            <small>New arrival</small>
          </p>
          <samp>$45.00</samp>
        </div>
        <div class="button">
          <p class="star">
            <strong>&star;</strong>
            <strong>&star;</strong>
            <strong>&star;</strong>
            <strong>&star;</strong>
            <strong>&star;</strong>
          </p>
          <a href="#">Add-cart</a>
        </div>
      </div>
      <div class="product">
        <picture>
          <img src="https://via.placeholder.com/300x400?text=6" alt="">
        </picture>
        <div class="details">
          <p>
            <b>Product Six</b>
            <small>New arrival</small>
          </p>
          <samp>$45.00</samp>
        </div>
        <div class="button">
          <p class="star">
            <strong>&star;</strong>
            <strong>&star;</strong>
            <strong>&star;</strong>
            <strong>&star;</strong>
            <strong>&star;</strong>
          </p>
          <a href="#">Add-cart</a>
        </div>
      </div>
    </section>
    <!-- <BookList :books="popularBooks" /> -->
  </section>
</template>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: -webkit-pictograph;
}
.main {
  width: 100%;
  height: 840px;
  margin: 10px auto;
  position: relative;
  padding: 5px 0;
}
.text {
  padding: 10px;
  text-align: center;
  color: #554;
}
.text h2 {
  font-size: 50px;
}
.main header {
  width: 98%;
  height: 60px;
  margin: 0 auto;
  align-items: center;
  display: flex;
  padding: 20px;
  justify-content: space-between;
  border-bottom: 2px solid #ddd;
}
header p span {
  font-size: 40px;
  margin: 0 5px;
  cursor: pointer;
  color: #555;
  width: 30px;
  height: 30px;
  display: inline-block;
  line-height: 19px;
  text-align: center;
  border-radius: 3px;
  &:hover {
    background: #222;
    color: white;
  }
}
.product_section {
  width: 98%;
  height: 600px;
  margin: auto;
  display: flex;
  align-items: center;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
.product_section .product {
  min-width: 24%;
  height: 90%;
  background: whitesmoke;
  margin: 0 20px 0 0;
  border-radius: 20px;
  position: relative;
  left: 0;
  transition: 0.5s;
}
picture {
  width: 100%;
  height: 70%;
  padding: 20px;
  display: flex;
  overflow: hidden;
  margin-bottom: 20px;
}
picture img {
  width: 100%;
}
.details, .button {
  width: 90%;
  margin: auto;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  font-size: 20px;
  color: #444;
}
small {
  color: #555;
}
a {
  text-decoration: none;
  padding: 6px 14px;
  font-size: 15px;
  margin: 5px 0 0 20px;
  display: inline-block;
  background: #6773ff;
  color: white;
}
p.star {
  margin: 5px auto;
  width: 65%;
  font-size: 25px;
  color: #808080;
}

// #carouselExample {
//   margin-top: 50px;
// }

// @media (max-width: 768px) {
//   .carousel-inner .carousel-item > div {
//     display: none;
//   }

//   .carousel-inner .carousel-item > div:first-child {
//     display: block;
//   }
// }

// .carousel-inner .carousel-item.active,
// .carousel-inner .carousel-item-start,
// .carousel-inner .carousel-item-next,
// .carousel-inner .carousel-item-prev {
//   display: flex;
// }

// @media (min-width: 768px) {

//   .carousel-inner .carousel-item-right.active,
//   .carousel-inner .carousel-item-next,
//   .carousel-item-next:not(.carousel-item-start) {
//     transform: translateX(25%) !important;
//   }

//   .carousel-inner .carousel-item-left.active,
//   .carousel-item-prev:not(.carousel-item-end),
//   .active.carousel-item-start,
//   .carousel-item-prev:not(.carousel-item-end) {
//     transform: translateX(-25%) !important;
//   }

//   .carousel-item-next.carousel-item-start,
//   .active.carousel-item-end {
//     transform: translateX(0) !important;
//   }

//   .carousel-inner .carousel-item-prev,
//   .carousel-item-prev:not(.carousel-item-end) {
//     transform: translateX(-25%) !important;
//   }
// }

// .popular-books {
//   margin-top: 30px;
//   margin-bottom: 24px;
//   padding: 10px 20px;
//   border-radius: 15px;
//   background: #ffffff;

//   &__top {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }

//   &__title {
//     font-size: 20px;
//     font-weight: 600px;
//     line-height: 28px;
//   }

//   &__summary {
//     display: block;
//     margin-bottom: 8px;
//     line-height: 24px;
//     color: #4f4f4f;
//   }
// }
</style>