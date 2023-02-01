<script setup>
import { Form, Field } from "vee-validate"
import * as Yup from "yup"
import axios from "@/config"

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1`;

const schema = Yup.object().shape({
    name: Yup.string().required("Name is required")
});

const onSubmit = async (values) => {
  await axios.post(`${baseUrl}/genres/`, values )
    .then((res) => {
      console.log(res.data)
    })
};
</script>

<template>
  <h2>Жанры</h2>
  <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
    <label for="floatingInput">Введите название жанра</label>
    <Field name="name" type="text" class="form-control rounded-3" :class="{ 'is-invalid': errors.name }" id="floatingInput" placeholder="Название жанра" />
    <div class="invalid-feedback">{{ errors.name }}</div>
    <button class="btn btn-lg btn-primary">Добавить</button>
  </Form>
</template>