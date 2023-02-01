<script setup>
import Header from './components/Layout/Header.vue'
import Footer from './components/Layout/Footer.vue'
</script>

<template>
  <div class="container d-flex flex-column min-vh-100">
    <div class="wrapper flex-grow-1">
      <Header />
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;300;400;600&display=swap');
@import './assets/main.scss';
</style>
