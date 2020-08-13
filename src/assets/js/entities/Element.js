import Vue from 'vue';
import ElementComponent from '@/components/Element';
import echarts from 'echarts';
import store from '@/store';
import { toJSON } from '../utils';

let elementId = 0;

// 默认配置
const defaultOptions = () => ({
  size: {
    width: 600,
    height: 400,
  },
  position: {
    left: 30,
    top: 30,
  },
  background: {
    color: 'rgba(0, 0, 0, 0.8)',
  },
  visible: true,
  zIndex: 500,
  compOption: {},
});

export default class Element {
  constructor(options = {}) {
    const mergedOptions = { ...defaultOptions(), ...options };
    if (!mergedOptions.id) {
      // 没有id则创建一个ID
      this.id = elementId++;
    }
    Object.assign(this, mergedOptions);
    this.render();
  }

  toJSON() {
    return toJSON(this);
  }

  setTop(top) {
    this.position.top = top;
  }

  getTop() {
    return this.position.top;
  }

  setLeft(left) {
    this.position.left = left;
  }

  getLeft() {
    return this.position.left;
  }

  moveToTop(distance) {
    this.setTop(this.getTop() + distance);
  }

  moveToLeft(distance) {
    this.setLeft(this.getLeft() + distance);
  }

  setPosition(position) {
    const { left, top } = position;
    this.setLeft(left);
    this.setTop(top);
  }

  getWidth() {
    return this.size.width;
  }

  setWidth(width) {
    if (this.size.width !== width) {
      this.size.width = width;
      this.fill();
    }
  }

  getHeight() {
    return this.size.height;
  }

  setHeight(height) {
    if (this.size.height !== height) {
      this.size.height = height;
      this.fill();
    }
  }

  // 设置 element的容器配置实例
  setContainer(container) {
    this.$container = container;
  }

  getContainer() {
    return this.$container;
  }

  getZIndex() {
    let { zIndex } = this;
    if (!this.getContainer()) return zIndex;
    zIndex =
      500 -
      this.getContainer()
        .getElementOrders()
        .indexOf(this.id);
    this.zIndex = zIndex;
    return zIndex;
  }

  setChartOption(chartOption) {
    this.chartOption = chartOption;
    this.fill();
  }

  setCompOption(compOption) {
    this.compOption = compOption;
    this.fill();
  }

  getBackgroundColor() {
    return this.background.color;
  }

  setBackgroundColor(color) {
    this.background.color = color;
  }

  // 渲染方法
  render() {
    const elementConfig = this;
    // 创建Vue实例并挂载到容器中
    const ElementConstructor = Vue.extend(ElementComponent);
    const elementVM = new ElementConstructor({
      store,
      propsData: {
        config: this,
      },
      props: {
        config: {
          type: Element,
          required: true,
        },
      },
      created() {
        if (elementConfig.$editable) {
          // 设置拖拽回调
          this.callbacks = {
            onDragEnd: ({ top, left }) => {
              // 修改相应配置
              elementConfig.setTop(top);
              elementConfig.setLeft(left);
            },
            resized: ({ width, height }) => {
              // 设置大小调节回调
              elementConfig.setWidth(width);
              elementConfig.setHeight(height);
              elementConfig.fill();
            },
          };
        }
      },
    });
    elementVM.$mount(); // vue 实例挂载
    this.$el = elementVM.$el;
    this.$elementVM = elementVM; // 在配置实例上添加一个指针指向对应的 vue实例
    this.setStyle();
    // 将指定类型的内容填充到元素中
    this.fill();
  }

  // 将当前元素在所在的容器中拷贝一份
  copy() {
    this.$container.addElement(
      new Element({
        ...JSON.parse(JSON.stringify(this)), // 深拷贝
        $editable: true,
        id: elementId++,
      }),
    );
  }

  // 设置样式
  setStyle() {
    const { size, position, background } = this; // 大小，位置
    this.setTop(position.top);
    this.setLeft(position.left);
    this.setWidth(size.width);
    this.setHeight(size.height);
    this.setBackgroundColor(background.color);
  }

  // 根据类型填充内容到元素中
  fill() {
    if (!this.$elementVM) return;
    this.$elementVM.$nextTick(() => {
      const { type, componentName, chartOption, compOption } = this; // 大小，位置
      if (type === 'chart') {
        const chart = echarts.init(this.$elementVM.$refs.content);
        chart.setOption(chartOption);
        chart.resize();
      } else if (type === 'component') {
        // 如果没有挂载组件，就初始化组件并挂载
        if (!this.$elementVM.childVM) {
          const comp = require(`@/components/${componentName}`).default;
          const Ctor = Vue.extend(comp);
          const vm = new Ctor({
            propsData: compOption,
          });
          vm.$mount(this.$elementVM.$refs.content); // vue 实例挂载
          this.$elementVM.childVM = vm;
        } else {
          // 如果已挂载了组件，就更新组件
          for (const key in compOption) {
            this.$elementVM.childVM.$props[key] = compOption[key];
          }
        }
      }
    });
  }

  // 自毁方法
  destroy() {
    this.$container.removeElement(this); // 从容器配置实例中删除当前元素
    this.$el.remove();
  }
}
