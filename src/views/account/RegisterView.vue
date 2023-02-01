<script setup>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";

import { useUsersStore } from "@/stores/UsersStore";
import { useAlertStore } from "@/stores/AlertStore";
import router from "@/router";

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
  const usersStore = useUsersStore();
  const alertStore = useAlertStore();

  try {
    await usersStore.register(values);
    await router.push("/account/login");
    alertStore.success("Registration successful");
  } catch (error) {
    alertStore.error(error);
  }
    
};
</script>

<template>
  <div class="text-center body">
    <main class="form-signup w-100 m-auto">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <img class="mb-4" src="/images/bootstrap-logo.svg" alt="" width="72" height="57">
        <h1 class="h3 mb-3 fw-normal">Sign up for free</h1>

        <div class="form-floating mb-3">
          <Field name="username" type="text" class="form-control rounded-3" :class="{ 'is-invalid': errors.username }"
            id="floatingInput" placeholder="Username" />
          <label for="floatingInput">Username</label>
          <div class="invalid-feedback">{{ errors.username }}</div>
        </div>
        <div class="form-floating mb-3">
          <Field name="email" type="email" class="form-control rounded-3" :class="{ 'is-invalid': errors.email }"
            id="floatingEmail" placeholder="name@example.com" />
          <label for="floatingEmail">Email address</label>
          <div class="invalid-feedback">{{ errors.email }}</div>
        </div>
        <div class="form-floating mb-3">
          <Field name="password" type="password" class="form-control rounded-3"
            :class="{ 'is-invalid': errors.password }" id="floatingPassword" placeholder="Password" />
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
    </main>
  </div>
</template>

<style lang="css" scoped>
.body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  height: 100%;
}

.form-signup {
  max-width: 380px;
  padding: 15px;
}

.form-signup .form-floating:focus-within {
  z-index: 2;
}
</style>