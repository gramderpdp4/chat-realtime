import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import '../node_modules/primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import { addComponents } from './js/components'
import DialogService from 'primevue/dialogservice';

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(DialogService)

addComponents(app)

app.mount('#app')
