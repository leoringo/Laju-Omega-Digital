<script>
import { mapWritableState } from "pinia";
import { useUserStore } from "../stores/user";

export default {
  name: "Navbar",
  computed: {
    ...mapWritableState(useUserStore, ["isLogged", "email"]),
  },
  methods: {
    logout() {
      localStorage.clear();
      this.isLogged = false;
      this.email = null;
      this.$router.push("/");
    },

    isActive(routeName) {
      return this.$route.name === routeName;
    },
  },
  async created() {
    if (localStorage.email) {
      this.isLogged = true;
      this.email = localStorage.email;
    }
  },
};
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light shadow mb-4 p-3 bg-body rounded"
  >
    <div class="navbar-nav mx-auto">
      <button
        type="button"
        class="nav-item me-3 btn btn-outline-primary"
        :class="{ active: isActive('home') }"
      >
        <router-link class="text-decoration-none text-dark" to="/"
          >Home</router-link
        >
      </button>
      <button
        type="button"
        class="btn btn-outline-primary nav-item me-3"
        :class="{ active: isActive('newArticle') }"
      >
        <router-link to="/new-article" class="text-decoration-none text-dark">
          Create Article
        </router-link>
      </button>
      <button
        type="button"
        class="nav-item me-3 btn btn-outline-info text-decoration-none"
        :class="{ active: isActive('login') }"
        v-if="isLogged === false"
      >
        <router-link class="text-dark text-decoration-none" to="/login"
          >Sign In</router-link
        >
      </button>
      <template v-if="isLogged === true">
        <button
          class="d-flex align-items-center text-decoration-none btn btn-danger"
          @click.prevent="logout"
        >
          Logout
        </button>
        <span class="badge bg-dark text-center d-flex align-items-center ms-3"
          >WELCOME {{ email }}</span
        >
      </template>
    </div>
  </nav>
</template>

<style scoped>
.navbar-nav .nav-item.active {
  background-color: rgb(9, 118, 252);
  /* color: #fff; */
}
</style>
