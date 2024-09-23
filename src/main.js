import './assets/main.css'
import './assets/grid.css'

import { createApp } from 'vue'
import App from './App.vue'

// Import Bootstrap CSS and JS
import './assets/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'

const app = createApp(App)

// Mount the app
app.mount('#app')