import './assets/style/main.css'

import { createApp } from 'vue'
import {createPinia} from "pinia";
import App from './App.vue'
import router from './router'
import piniaPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersistedstate);


router.onError((error) => {
    console.error('Router error:', error);
});

const app = createApp(App);
app.use(pinia)
app.use(router)
app.mount('#app')