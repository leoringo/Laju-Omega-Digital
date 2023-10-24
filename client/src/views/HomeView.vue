<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useArticleStore } from "../stores/article";
import Article from "../components/Article.vue";

export default {
  data() {
    return {
      name: "",
      category: "",
    };
  },
  components: {
    Article,
  },
  computed: {
    ...mapState(useArticleStore, ["articles"]),
  },
  methods: {
    ...mapActions(useArticleStore, ["fetchArticle"]),
  },
  created() {
    this.fetchArticle();
  },
};
</script>

<template>
  <div class="px-5">
    <img
      style="height: 500px; object-fit: cover"
      class="d-block w-100"
      src="https://www.uipi.com/wp-content/uploads/2018/04/Featured-Articles-Series-Web-Banner-new.png"
      alt="First slide"
    />

    <div class="row">
      <div class="col-3">
        <div class="d-flex justify-content-start align-item-center mt-4">
          <div class="card p-5 me-3">
            <div>
              <h3>Search by Name</h3>
            </div>
            <div class="d-flex justify-content-start align-item-center my-2">
              <div>
                <form>
                  <!-- @submit.prevent="getProduct(filter)" -->
                  <!-- <input v-model="filter" type="text" /> -->
                  <button type="submit" class="btn btn-primary mt-2">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-9 mt-4">
        <table class="table">
          <thead class="table-dark">
            <tr>
              <th scope="col" class="text-center">#</th>
              <th scope="col" class="text-center">Judul</th>
              <th scope="col">Kategori</th>
              <th scope="col" class="text-center">Penulis</th>
              <th scope="col" class="text-center">Tanggal Publikasi</th>
              <th scope="col" class="text-center">Command</th>
            </tr>
          </thead>
          <tbody>
            <!-- Articles Rows -->
            <Article
              v-for="(article, index) in articles"
              :key="article.id"
              :article="article"
              :index="index"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style></style>
