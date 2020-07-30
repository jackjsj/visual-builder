import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: '/visual-builder/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/home'),
    },
  ],
});
