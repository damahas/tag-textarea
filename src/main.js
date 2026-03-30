import { createApp } from 'vue'
import TagTextarea from './index.js'
import App from './example/App.vue'

const app = createApp(App)

app.use(TagTextarea)
app.mount('#app')
