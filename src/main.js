import './assets/main.css'
import './assets/grid.css'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import VueGtag from 'vue-gtag'

// Import Bootstrap CSS and JS
import './assets/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import your view components
import TheAboutPage from "@/components/TheAboutPage.vue";
import TheTaxCalculator from "@/components/TheTaxCalculator.vue";
import TheDataPolicy from "@/components/TheDataPolicy.vue";

// Create router instance
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', name: 'Home', component: TheTaxCalculator },
        { path: '/about', name: 'About', component: TheAboutPage },
        { path: '/data-policy', name: 'Data Policy', component: TheDataPolicy },
    ]
})

const app = createApp(App)

// Use router
app.use(router)

app.use(VueGtag, {
    config: { id: 'G-2XBRE28Z4Y' }
}, router)

// Mount the app
app.mount('#app')