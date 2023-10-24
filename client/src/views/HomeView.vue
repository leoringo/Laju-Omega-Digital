<script>
import { mapActions, mapState } from "pinia";
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

    getArticle() {
      let value = {
        name: this.name,
        category: this.category,
      };
      this.fetchArticle(value);
    },
  },
  created() {
    this.fetchArticle({ name: "", category: "" });
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
                <form @submit.prevent="getArticle">
                  <input v-model="name" type="text" />
                  <select
                    v-model="category"
                    class="form-select mt-3"
                    aria-label="Default select example"
                  >
                    <option value="" selected>Select a Category</option>
                    <option value="Rumah dan Dekorasi">
                      Rumah dan Dekorasi
                    </option>
                    <option value="Travel">Travel</option>
                    <option value="Kuliner">Kuliner</option>
                    <option value="Hiburan">Hiburan</option>
                    <option value="Otomotif">Otomotif</option>
                    <option value="Pendidikan">Pendidikan</option>
                  </select>
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
