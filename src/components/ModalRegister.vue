<script setup>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";

import { useAlertStore } from "@/stores/AlertStore";
import { useUsersStore } from "@/stores/UsersStore";
import router from "@/router";

const props = defineProps({
    show: Boolean
});

const schema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required"),
  email: Yup.string()
    .required("Email Address is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const onSubmit = async (values) => {
  const alertStore = useAlertStore();
  const usersStore = useUsersStore();

  const { username, email, password } = values;
  try {
    await usersStore.register(username, email, password);
    await router.push("/account/login");
    alertStore.success("Registration successful");
  } catch (error) {
    alertStore.error(error);
  }
};
</script>

<template>
  <div class="modal modal-signin d-block bg-secondar py-5" tabindex="-1" role="dialog" id="modalSignin" v-if="show">
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-4 shadow">
        <div class="modal-header p-5 pb-4 border-bottom-0">
          <h1 class="fw-bold mb-0 fs-2">Sign up for free</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="$emit('close')"></button>
        </div>

        <div class="modal-body p-5 pt-0">
          <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
            <div class="form-floating mb-3">
              <Field name="username" type="text" class="form-control rounded-3" :class="{ 'is-invalid': errors.username }" id="floatingInput" placeholder="Username" />
              <label for="floatingInput">Username</label>
              <div class="invalid-feedback">{{ errors.username }}</div>
            </div>
            <div class="form-floating mb-3">
              <Field name="email" type="email" class="form-control rounded-3" :class="{ 'is-invalid': errors.email }" id="floatingEmail" placeholder="name@example.com" />
              <label for="floatingEmail">Email address</label>
              <div class="invalid-feedback">{{ errors.email }}</div>
            </div>
            <div class="form-floating mb-3">
              <Field name="password" type="password" class="form-control rounded-3" :class="{ 'is-invalid': errors.password }" id="floatingPassword" placeholder="Password" />
              <label for="floatingPassword">Password</label>
              <div class="invalid-feedback">{{ errors.password }}</div>
            </div>
            <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" :disabled="isSubmitting">
              <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>Sign up</button>
            <small class="text-muted">By clicking Sign up, you agree to the terms of use.</small>
            <hr class="my-4">
            <h2 class="fs-5 fw-bold mb-3">Or use a third-party</h2>
            <button class="w-100 py-2 mb-2 btn btn-outline-dark rounded-3" type="submit">
              <svg class="bi me-1" width="16" height="16">
                <use xlink:href="#twitter" />
              </svg>
              Sign up with Twitter
            </button>
            <button class="w-100 py-2 mb-2 btn btn-outline-primary rounded-3" type="submit">
              <svg class="bi me-1" width="16" height="16">
                <use xlink:href="#facebook" />
              </svg>
              Sign up with Facebook
            </button>
            <button class="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3" type="submit">
              <svg class="bi me-1" width="16" height="16">
                <use xlink:href="#github" />
              </svg>
              Sign up with GitHub
            </button>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.modal {
    background-color: rgba(0, 0, 0, .5);
}

.modal-sheet .modal-dialog {
  width: 380px;
  transition: bottom .75s ease-in-out;
}

.modal-alert .modal-dialog {
  width: 380px;
}

.modal-tour .modal-dialog {
  width: 380px;
}
</style>