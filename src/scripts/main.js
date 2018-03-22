import Vue from 'vue';
import VueRouter from 'vue-router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'Styles/index.scss';
import routes from './router';
import App from '../App.vue';

Vue.use(ElementUI);

Vue.prototype.$http = axios;

Vue.use(VueRouter);
const router = new VueRouter({
	routes
});

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});