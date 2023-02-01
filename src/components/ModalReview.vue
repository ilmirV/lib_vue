<script setup>
import { Form, Field } from "vee-validate";
import { useRoute } from 'vue-router'
import { ref } from "vue";
import * as Yup from "yup";
import axios from "@/config";
import router from "@/router";


const route = useRoute()

const schema = Yup.object().shape({
  title: Yup.string()
    .required("Это поле обязательно для заполнения"),
  review_text: Yup.string()
    .required("Это поле обязательно для заполнения"),
});

const props = defineProps({
  show: Boolean
})

const bookId = ref('')

const onSubmit = async (values) => {
  bookId.value = route.params.id;
  values["book"] = bookId.value
  await axios.post("/api/v1/reviews/", values)
    .catch(error => {
      console.log(error)
    })
  await router.push(`/books/`);
}
</script>

<template>
  <Transition name="modal">
    <div class="modal-mask py-5" tabindex="-1" role="dialog" v-if="show">
      <div class="modal-container rounded-4 shadow">
        <div class="modal-header pb-4">
          <h1 class="mb-0 fs-2">Новый отзыв</h1>
          <button type="button" class="btn-close" aria-label="Close"
            @click="$emit('close')"></button>
        </div>

        <div class="modal-body">
          <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
            <div class="mb-3">
              <label for="reviewTitle" class="col-form-label">Название</label>
              <Field name="title" class="form-control" :class="{ 'is-invalid': errors.title }" id="reviewTitle" />
              <div class="invalid-feedback">{{ errors.title }}</div>
            </div>
            <div class="mb-3">
              <label for="reviewText" class="col-form-label">Текст отзыва</label>
              <Field name="review_text" v-slot="{ field }">
                <textarea v-bind="field" class="form-control" rows="5" id="reviewText" :class="{ 'is-invalid': errors.review_text }"></textarea>
              </Field>
              <div class="invalid-feedback">{{ errors.review_text }}</div>
            </div>
            <button class="btn btn-secondary" @click="$emit('close')">Отменить</button>
            <button class="btn btn-primary" :disabled="isSubmitting">
              <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>Отправить
            </button>
            
          </Form>
        </div>

        <div class="modal-footer">
          
        </div>
      </div>
  </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 500px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>