<script setup>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";

import { useAuthStore } from "@/stores/AuthStore";

const schema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
});

const onSubmit = async (values) => {
    const authStore = useAuthStore();
    const { username, password } = values;
    await authStore.login(username, password);
};
</script>

<template>
  <div class="text-center body">
    <main class="form-signin w-100 m-auto">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        <div class="form-floating mb-3">
          <Field name="username" type="text" class="form-control rounded-3" :class="{ 'is-invalid': errors.username }" id="floatingInput" placeholder="Username" />
          <label for="floatingInput">Username</label>
          <div class="invalid-feedback">{{ errors.username }}</div>
        </div>
        <div class="form-floating mb-3">
          <Field name="password" type="password" class="form-control rounded-3" :class="{ 'is-invalid': errors.password }" id="floatingPassword" placeholder="Password" />
          <label for="floatingPassword">Password</label>
          <div class="invalid-feedback">{{ errors.password }}</div>
        </div>

        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <button class="w-100 btn btn-lg btn-primary">Sign in</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2022–2023</p>
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

.form-signin {
  max-width: 380px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}
</style>