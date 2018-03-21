import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'Styles/index.scss';
import App from '../App.vue';

Vue.use(ElementUI);

Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  render: h => h(App)
});