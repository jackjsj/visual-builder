import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/style/index.scss';
import './initComponents'; // 初始加载的ant-design-vue 组件，考虑到性能优化，如非常用组件，请勿在里面添加，

Vue.config.productionTip = false;

console.log(store);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
