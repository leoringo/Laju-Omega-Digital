<script>
import { mapActions, mapState } from "pinia";
import { useArticleStore } from "../stores/article";

export default {
  computed: {
    ...mapState(useArticleStore, ["articleDetail"]),
  },
  methods: {
    ...mapActions(useArticleStore, ["fetchArticleDetail"]),
  },
  created() {
    this.fetchArticleDetail(this.$route.params.id);
  },
};
</script>

<template>
  <div class="px-5">
    <div class="mt-5">
      <div class="my-3">
        <h3 class="text-success">Judul</h3>
        <p>{{ articleDetail.judul }}</p>
      </div>
      <div class="my-3">
        <h3 class="text-success">Kategori</h3>
        <p>{{ articleDetail.kategori }}</p>
      </div>
      <div class="my-3">
        <h3 class="text-success">Konten</h3>
        <p>{{ articleDetail.konten }}</p>
      </div>
      <div class="my-3">
        <h3 class="text-success">Tanggal Publikasi</h3>
        <p>{{ articleDetail.tanggalPublikasi.split("T")[0] }}</p>
      </div>
      <div class="my-3">
        <h3 class="text-success">Penulis</h3>
        <p>{{ articleDetail.User.email }}</p>
      </div>
      <div class="my-3">
        <h3 class="text-success">Total Viewers</h3>
        <p>{{ articleDetail.totalViews }}</p>
      </div>
    </div>
  </div>
</template>

<style></style>
