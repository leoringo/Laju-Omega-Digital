import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useArticleStore = defineStore('article', {
  state: () => ({
    baseUrl: "http://localhost:3000",
    articles: [],
    articleDetail: {}
  }),

  actions: {
    swalError() {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    },

    async fetchArticle() {
      try {
        const { data } = await axios.get(this.baseUrl)
        this.articles = data
      } catch (error) {
        console.log(error);
      }
    },

    async fetchArticleDetail(id) {
      try {
        const { data } = await axios.get(this.baseUrl + '/detail/' + id)
        this.articleDetail = data
        console.log(this.articleDetail);
      } catch (error) {
        console.log(error);
      }
    }
  },
})
