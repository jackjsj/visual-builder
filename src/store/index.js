import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeElements: [],
  },
  mutations: {
    // 添加选中的元素到选中列表中
    addActiveElement(state, element) {
      const self = this;
      function onParentClick(e) {
        const el = element.$el;
        if (!e.path.includes(el)) {
          self.commit('removeActiveElement', element);
          el.blur();
          el.offsetParent.removeEventListener('click', onParentClick);
        }
      }
      if (!state.activeElements.includes(element)) {
        state.activeElements.push(element);
        const el = element.$el;
        el.focus();
        el.offsetParent.addEventListener('click', onParentClick);
      }
    },

    // 将元素从选中列表中移除
    removeActiveElement(state, element) {
      const target = state.activeElements.indexOf(element);
      if (target > -1) {
        state.activeElements.splice(target, 1);
      }
    },

    clearActiveElements(state) {
      state.activeElements = [];
    },
  },
});
