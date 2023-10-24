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

    async fetchArticle({ name, category }) {
      try {
        let url = this.baseUrl

        if (name && category) url = this.baseUrl + `/?name=${name}&category=${category}`

        else if (name) url = this.baseUrl + `/?name=${name}`

        else if (category) url = this.baseUrl + `/?category=${category}`

        const { data } = await axios.get(url)
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
        this.fetchArticle({})
      } catch (error) {
        this.swalError(error)
      }
    },

    async createArticle(value) {
      try {
        const { data } = await axios({
          url: this.baseUrl,
          method: 'POST',
          headers: {
            access_token: localStorage.access_token
          },
          data: value
        })
        this.fetchArticle({})
        this.router.push('/')
      } catch (error) {
        this.swalError(error)
      }
    },

    async editArticle(id, value) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/edit/' + id,
          method: 'PUT',
          headers: {
            access_token: localStorage.access_token
          },
          data: value
        })
        this.fetchArticle({})
        this.router.push('/')
      } catch (error) {

      }
    }
  },
})
