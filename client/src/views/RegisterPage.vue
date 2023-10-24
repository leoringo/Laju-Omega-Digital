<script>
import { mapActions } from "pinia";
import { useUserStore } from "../stores/user";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(useUserStore, ["register"]),
    submitRegister() {
      let value = {
        email: this.email,
        password: this.password,
      };

      this.register(value);
    },
  },
};
</script>

<template>
  <div>
    <div class="d-flex justify-content-center">
      <h1>Register Form</h1>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <div class="row p-2 bg-primary">
        <div class="col card m-3 p-2">
          <section id="register-section">
            <form class="container" @submit.prevent="submitRegister">
              <!-- Email input -->
              <div class="form-outline mb-4">
                <label class="form-label" for="form1Example1">Email:</label>
                <input
                  type="email"
                  id="form1Example1"
                  v-model="email"
                  class="form-control"
                />
              </div>

              <!-- Password input -->
              <div class="form-outline mb-4">
                <label class="form-label" for="form1Example2">Password:</label>
                <input
                  type="password"
                  id="form1Example2"
                  v-model="password"
                  class="form-control"
                />
              </div>

              <!-- Submit button -->
              <div class="d-flex justify-content-center">
                <button class="btn btn-primary" type="submit">Register</button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
