import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronRight, faStar, faUser, faBook, faMasksTheater, faFeather } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

library.add([faChevronRight, faStar, farStar, faUser, faBook, faMasksTheater, faFeather]);

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(pinia);

app.use(router);

app.mount('#app');
