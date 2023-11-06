import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { piniaUndo } from './undoRedo/piniaUndo'

const pinia = createPinia()
pinia.use(piniaUndo)

const app = createApp(App)
app.use(pinia)
createApp(App).mount('#app')
