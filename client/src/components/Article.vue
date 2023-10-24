<script>
import { mapActions } from "pinia";
import { useArticleStore } from "../stores/article";

export default {
  props: ["article", "index"],
  methods: {
    ...mapActions(useArticleStore, [""]),

    async toDetail(id) {
      try {
        this.$router.push("/detail/" + id);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <tr class="custom-pointer" @click.prevent="toDetail(article.id)">
    <th scope="row">{{ index + 1 }}</th>
    <td>{{ article.judul }}</td>
    <td>{{ article.kategori }}</td>
    <td>{{ article.User.email }}</td>
    <td>
      {{ article.tanggalPublikasi.split("T")[0] }}
    </td>
    <td class="">
      <button @click="editArticle(article)" class="btn btn-primary mx-2">
        Edit
      </button>
      <button @click="deleteArticle(article)" class="btn btn-danger mx-2">
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
