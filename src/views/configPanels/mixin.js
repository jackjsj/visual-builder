import BaseConfigPanel from './BaseConfigPanel';

// 所有配置面板组件都混入以下options
export default {
  components: {
    BaseConfigPanel,
  },
  props: {
    options: {
      type: Object,
      default() {
        return {
          size: {},
          position: {},
          background: {},
        };
      },
    },
  },
  methods: {
    onChange() {
      this.$emit('change', this.options);
    },
  },
};
