import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

// styling
import './scss/app.scss';

Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
