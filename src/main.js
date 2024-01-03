import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import '../node_modules/primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import DynamicDialog from 'primevue/dynamicdialog';
import DialogService from 'primevue/dialogservice';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InlineMessage from 'primevue/inlinemessage';
import Avatar from 'primevue/avatar'
import Skeleton from 'primevue/skeleton';
import Divider from 'primevue/divider'
import OverlayPanel from 'primevue/overlaypanel';
import ProgressSpinner from 'primevue/progressspinner';

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(DialogService)

app.component("DynamicDialog", DynamicDialog)
app.component("InputText", InputText)
app.component("Button", Button)
app.component("InlineMessage", InlineMessage)
app.component("Avatar", Avatar)
app.component("Skeleton", Skeleton)
app.component("Divider", Divider)
app.component("OverlayPanel", OverlayPanel)
app.component("ProgressSpinner", ProgressSpinner)

app.mount('#app')
