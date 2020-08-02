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
  computed: {
    width: {
      set(width) {
        this.options.setWidth(width);
      },
      get() {
        return this.options.size.width;
      },
    },
    height: {
      set(height) {
        this.options.setHeight(height);
      },
      get() {
        return this.options.size.height;
      },
    },
    left: {
      set(left) {
        this.options.setLeft(left);
      },
      get() {
        return this.options.position.left;
      },
    },
    top: {
      set(top) {
        this.options.setTop(top);
      },
      get() {
        return this.options.position.top;
      },
    },
    backgroundColor: {
      set(color) {
        this.onColorChange(color);
      },
      get() {
        return this.options.background.color;
      },
    },
  },
  methods: {
    onColorChange(color) {
      const { r, g, b, a } = color.rgba;
      const colorStr = `rgba(${r},${g},${b},${a})`;
      this.options.setBackgroundColor(colorStr);
    },
  },
};
