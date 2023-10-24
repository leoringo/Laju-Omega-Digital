<script>
import Navbar from "./components/Navbar.vue";
import { RouterView } from "vue-router";

export default {
  components: {
    Navbar,
    RouterView,
  },
};
</script>

<template>
  <div>
    <Navbar />

    <RouterView />
  </div>
</template>
