<script>
import { mapActions } from "pinia";
import { useArticleStore } from "../stores/article";

export default {
  data() {
    return {
      article: {
        judul: "",
        kategori: "",
        konten: "",
      },
    };
  },
  methods: {
    ...mapActions(useArticleStore, ["createArticle"]),
    submitForm() {
      let value = {
        judul: this.article.judul,
        kategori: this.article.kategori,
        konten: this.article.konten,
      };
    },
  },
};
</script>

<template>
  <div>
    <h2 class="text-center">Create Article</h2>
    <div class="container">
      <form @submit.prevent="submitForm" class="my-4">
        <div class="mb-3">
          <label for="judul" class="form-label">Judul</label>
          <input
            type="text"
            class="form-control"
            id="judul"
            v-model="article.judul"
            required
          />
        </div>

        <div class="mb-3">
          <label for="kategori" class="form-label">Kategori</label>
          <select
            class="form-select"
            id="kategori"
            v-model="article.kategori"
            required
          >
            <option value="" disabled>Select a Category</option>
            <option value="Rumah dan Dekorasi">Rumah dan Dekorasi</option>
            <option value="Travel">Travel</option>
            <option value="Kuliner">Kuliner</option>
            <option value="Hiburan">Hiburan</option>
            <option value="Otomotif">Otomotif</option>
            <option value="Pendidikan">Pendidikan</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="konten" class="form-label">Konten</label>
          <textarea
            class="form-control"
            id="konten"
            rows="6"
            v-model="article.konten"
            required
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<style></style>
