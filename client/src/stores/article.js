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
    swalError(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
      })
      console.log(error.response.data.message);
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
      } catch (error) {
        console.log(error);
      }
    },

    async deleteArticle(id) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/delete/' + id,
          method: 'DELETE',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.fetchArticle()
      } catch (error) {
        this.swalError(error)
      }
    }
  },
})
