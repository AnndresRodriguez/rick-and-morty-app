import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '../src/api';
import vmodal from 'vue-js-modal';
    


// CSS Globales
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../src/assets/css/global.css';

// Configuración Global Axios
Vue.prototype.$http = axios;

Vue.use(vmodal);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
