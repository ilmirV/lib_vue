<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { useSearchStore } from "@/stores/SearchStore";
import LogoIcon from "@/components/icons/IconLogo.vue";
import { ref } from 'vue';
import { Form, Field } from "vee-validate";
import router from '@/router';

const authStore = useAuthStore();
const searchQuery = ref('')

const onSubmit = async () => {
  const searchStore = useSearchStore();
  await searchStore.search(searchQuery.value)
  await router.push("/search");
};
</script>

<template>
  <header
    class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start py-3 mb-4 border-bottom">

    <router-link to="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
      <!-- <logo-icon class="bi me-2" /> -->
      <img src="/images/iqra-logo.svg" width="150" class="me-2" alt="">
    </router-link>

    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
      <li><router-link to="/" class="nav-link px-2 link-secondary">Главная</router-link></li>
      <li><router-link to="/books" class="nav-link px-2 link-dark">Книги</router-link></li>
      <li><router-link to="/authors" class="nav-link px-2 link-dark">Авторы</router-link></li>
      <li><router-link to="/" class="nav-link px-2 link-dark">FAQs</router-link></li>
      <li><router-link to="/" class="nav-link px-2 link-dark">О нас</router-link></li>
    </ul>

    <Form @input="onSubmit" class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
      <input type="text" class="form-control" placeholder="Поиск..." aria-label="Search" name="search" v-model="searchQuery">
    </Form>

    <div class="dropdown text-end" v-if="authStore.user">
      <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle pe-none" data-bs-toggle="dropdown" aria-expanded="false">
        <span class="pe-2" tabindex="-1" aria-disabled="true">{{ authStore.user.username }}</span>
        <img src="/images/user-pic.jpg" alt="mdo" width="32" height="32" class="rounded-circle pe-auto">
      </a>
      <ul class="dropdown-menu text-small">
        <li><router-link to="/mybooks" class="dropdown-item">Мои книги</router-link></li>
        <li><router-link to="/users/" class="dropdown-item">Настройки</router-link></li>
        <li><router-link to="/" class="dropdown-item">Профиль</router-link></li>
        <li v-show="authStore.user.is_librarian"><router-link to="/allborrowed" class="dropdown-item">Арендные книги</router-link></li>
        <li><hr class="dropdown-divider"></li>
        <button @click="authStore.logout()" class="dropdown-item">Выход</button>
      </ul>
    </div>

    <div class="text-end" v-else>
      <router-link to="/account/login" class="btn btn-outline-primary me-2">Вход</router-link>
      <router-link to="/account/register" class="btn btn-primary">Регистрация</router-link>
    </div>
  </header>
</template>

<style lang="css" scoped>

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
.bi {
  vertical-align: -.125em;
  fill: currentColor;
}
</style>