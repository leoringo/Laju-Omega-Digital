<script>
import { mapActions } from "pinia";
import { useArticleStore } from "../stores/article";

export default {
  props: ["article", "index"],
  methods: {
    ...mapActions(useArticleStore, ["deleteArticle"]),

    async toDetail(id) {
      try {
        this.$router.push("/detail/" + id);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteCommand(id) {
      try {
        this.deleteArticle(id);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <tr>
    <th scope="row">{{ index + 1 }}</th>
    <td>{{ article.judul }}</td>
    <td>{{ article.kategori }}</td>
    <td>{{ article.User.email }}</td>
    <td>
      {{
        article.tanggalPublikasi ? article.tanggalPublikasi.split("T")[0] : ""
      }}
    </td>
    <td class="">
      <button
        class="btn btn-primary mx-2"
        @click.prevent="toDetail(article.id)"
      >
        <!-- @click="editArticle(article)" -->
        Detail
      </button>
      <button class="btn btn-outline-warning mx-2">
        <!-- @click="editArticle(article)" -->
        Edit
      </button>
      <button
        @click.prevent="deleteCommand(article.id)"
        class="btn btn-danger mx-2"
      >
        Delete
      </button>
    </td>
  </tr>
</template>

<style scoped>
.custom-pointer {
  transition: opacity 0.3s;
}

.custom-pointer:hover {
  cursor: pointer;
  opacity: 0.5;
}
</style>
