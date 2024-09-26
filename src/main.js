import './assets/main.css'
import './assets/grid.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import VueGtag from 'vue-gtag'

// Import Bootstrap CSS and JS
import './assets/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'

// Import your view components
import TheAboutPage from "@/components/TheAboutPage.vue";
import TheTaxCalculator from "@/components/TheTaxCalculator.vue";
import TheDataPolicy from "@/components/TheDataPolicy.vue";

// Create router instance
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/bd-income-tax-calculator/', name: 'Home', component: TheTaxCalculator },
        { path: '/bd-income-tax-calculator/about', name: 'About', component: TheAboutPage },
        { path: '/bd-income-tax-calculator/data-policy', name: 'Data Policy', component: TheDataPolicy },
    ]
})

const app = createApp(App)

// Use router
app.use(router)

app.use(VueGtag, {
    config: { id: 'G-2XBRE28Z4Y' }
}, router) // Pass router to VueGtag for automatic page tracking

// Mount the app
app.mount('#app')