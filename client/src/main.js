import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const pinia = createPinia()
const app = createApp(App)
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.mount('#app')
