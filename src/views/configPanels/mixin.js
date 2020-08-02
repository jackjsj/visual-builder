import { Chrome } from 'vue-color';
import BaseConfigPanel from './BaseConfigPanel';

// 所有配置面板组件都混入以下options
export default {
  components: {
    BaseConfigPanel,
    'color-picker': Chrome,
  },
  props: {
    options: {
      type: Object,
      default() {
        return {
          size: {},
          position: {},
          background: {
            color: '#000',
          },
        };
      },
    },
  },
  methods: {
    onChange() {
      this.$emit('change', this.options);
    },
    onColorChange(color) {
      const { r, g, b, a } = color.rgba;
      const colorStr = `rgba(${r},${g},${b},${a})`;
      this.options.setBackgroundColor(colorStr);
    },
  },
};
