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
      this.$router.push("/");
      this.email = null;
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
    class="navbar navbar-expand-lg navbar-light bg-light shadow mb-4 p-3 bg-body rounded d-flex justify-content-between align-items-center"
  >
    <div class="mx-5">
      <img
        src="https://1000logos.net/wp-content/uploads/2020/09/Steelseries-logo.png"
        width="120"
      />
    </div>
    <div class="navbar-nav d-flex">
      <button
        type="button"
        class="nav-item me-3 btn btn-outline-info"
        :class="{ active: isActive('home') }"
      >
        <router-link class="text-dark" to="/">Home</router-link>
      </button>
      <button
        type="button"
        class="nav-item me-3 btn btn-outline-info"
        :class="{ active: isActive('login') }"
        v-if="isLogged === false"
      >
        <router-link class="text-dark" to="/login">Sign In</router-link>
      </button>
      <div class="me-3" v-if="isLogged === true">
        <div class="dropdown pb-4">
          <button
            href="#"
            class="d-flex align-items-center text-white text-decoration-none dropdown-toggle btn btn-outline-info"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span class="d-none d-sm-inline text-dark">Hi, {{ email }}!</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a
                class="dropdown-item text-light"
                href=""
                @click.prevent="logout"
                >Sign out</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-nav .nav-item.active {
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
}
</style>
