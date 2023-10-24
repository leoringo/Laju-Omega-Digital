import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useUserStore = defineStore('user', {
    state: () => ({
        baseUrl: "http://localhost:3000",
        isLogged: false,
        email: ''
    }),
    actions: {
        swalError(error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message
            })
            console.log(error.response.data.message);
        },

        async register(value) {
            try {
                const { data } = await axios({
                    url: this.baseUrl + '/register',
                    method: 'post',
                    data: value
                })
                this.router.push('/login')
            } catch (error) {
                this.swalError(error)
            }
        },

        async login(value) {
            try {
                const { data } = await axios({
                    url: this.baseUrl + '/login',
                    method: 'post',
                    data: value
                })
                this.isLogged = true
                this.email = data.email
                localStorage.access_token = data.access_token
                localStorage.email = data.email
                this.router.push('/')
            } catch (error) {
                this.swalError(error)
            }
        }
    },

})
