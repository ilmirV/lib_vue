<script setup>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import axios from "@/config";
import { ref } from "vue";

// import { useUsersStore } from "@/stores/UsersStore";
// import { useAlertStore } from "@/stores/AlertStore";
import router from "@/router";

const schema = Yup.object().shape({
  first_name: Yup.string()
    .required("First Name is required"),
  last_name: Yup.string()
    .required("Last Name is required"),
  image: Yup.mixed()
    .required("Это поле обязательно для заполнения")
});

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1`;

const onSubmit = async (values) => {
  console.log(values.image)

  await axios.post(`${baseUrl}/authors/`, values, {headers: {"Content-Type": "multipart/form-data"}})
    .then((res) => {
      console.log(res.data)
    })
    .catch(console.log('FAILURE!'))
  // await router.push("/authors")
  // const usersStore = useUsersStore();
  // const alertStore = useAlertStore();

  // try {
  //   await usersStore.register(values);
  //   await router.push("/account/login");
  //   alertStore.success("Registration successful");
  // } catch (error) {
  //   alertStore.error(error);
  // }
};
</script>

<template>
  <Form @submit="onSubmit" :validation-schema="schema" class="row g-3 m-auto" v-slot="{ errors, isSubmitting }">
    <h1 class="h3 mb-3 fw-normal">Добавление нового автора</h1>
    <div class="col-md-6">
      <label for="firstName" class="form-label">Имя</label>
      <Field class="form-control" name="first_name" aria-label="First name" id="firstName" :class="{ 'is-invalid': errors.first_name }" />
      <div class="invalid-feedback">{{ errors.first_name }}</div>
    </div>
    <div class="col-md-6">
      <label for="lastName" class="form-label">Фамилия</label>
      <Field class="form-control" name="last_name" aria-label="Last name" id="lastName" :class="{ 'is-invalid': errors.last_name }" />
      <div class="invalid-feedback">{{ errors.last_name }}</div>
    </div>
    <div class="col-md-12">
      <label for="formFile" class="form-label">Выберите изображение</label>
      <Field class="form-control" name="image" type="file" id="formFile" :class="{ 'is-invalid': errors.image }" />
      <div class="invalid-feedback">{{ errors.image }}</div>
    </div>
    <!-- <div class="col-md-6">
      <label for="dateOfBirth" class="form-label">Дата рождения</label>
      <input type="date" class="form-control" name="dateOfBirth" aria-label="Date of birth" id="dateOfBirth" />
    </div>
    <div class="col-md-6">
      <label for="dateOfDeath" class="form-label">Дата смерти</label>
      <input type="date" class="form-control" name="dateOfDeath" aria-label="Date of death" id="dateOfDeath" />
    </div> -->
    <div class="col-12 mt-4">
      <button class="btn btn-primary me-3" :disabled="isSubmitting">
        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>Добавить</button>
      <router-link to="/authors/" class="btn btn-outline-primary" role="button">Отмена</router-link>
    </div>
  </Form>
</template>

<style lang="css" scoped>
.row {
  max-width: 680px;
}
</style>