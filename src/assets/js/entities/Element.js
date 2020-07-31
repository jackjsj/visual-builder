import Vue from 'vue';
import ElementComponent from '@/components/Element';
import echarts from 'echarts';
import { toJSON } from '../utils';

let elementId = 0;

// 默认配置
const defaultOptions = () => ({
  position: {
    top: 20,
    left: 20,
  },
  size: {
    width: 400,
    height: 300,
  },
});

export default class Element {
  constructor(options = {}) {
    const mergedOptions = { ...defaultOptions(), ...options };
    this.id = elementId++;
    Object.assign(this, mergedOptions);
  }

  toJSON() {
    return toJSON(this);
  }

  setTop(top) {
    this.position.top = top;
  }

  setLeft(left) {
    this.position.left = left;
  }

  setWidth(width) {
    this.size.width = width;
  }

  setHeight(height) {
    this.size.height = height;
  }

  // 渲染方法
  render() {
    const { $editable } = this; // 大小，位置
    const element = this;
    // 创建Vue实例并挂载到容器中
    const ElementConstructor = Vue.extend(ElementComponent);
    const elementInstance = new ElementConstructor({
      propsData: {
        editable: $editable,
      },
      created() {
        if ($editable) {
          // 设置拖拽回调
          this.callbacks = {
            onDrag: ({ top, left }) => {
              this.top = top;
              this.left = left;
            },
            onDragEnd: ({ top, left }) => {
              // 修改相应配置
              element.setTop(top);
              element.setLeft(left);
            },
            resized: ({ width, height }) => {
              // 设置大小调节回调
              element.setWidth(width);
              element.setHeight(height);
              element.fill();
            },
          };
        }
      },
    });
    elementInstance.$mount();
    const el = elementInstance.$el;
    this.$elementInstance = elementInstance;
    // 设置样式
    this.setStyle(el);
    // 将指定类型的内容填充到元素中
    this.fill(el);
    return el; // 返回一个el
  }

  // 设置样式
  setStyle(el) {
    const { size, position } = this; // 大小，位置
    const { style } = el;
    style.top = `${position.top}px`;
    style.left = `${position.left}px`;
    style.width = `${size.width}px`;
    style.height = `${size.height}px`;
    return el; // 返回一个el
  }

  // 根据类型填充内容到元素中
  fill() {
    if (!this.$elementInstance) return;
    const { type, chartOption } = this; // 大小，位置
    if (type === 'chart') {
      this.$elementInstance.$nextTick(() => {
        const chart = echarts.init(this.$elementInstance.$refs.content);
        chart.setOption(chartOption);
        chart.resize();
      });
    }
  }
}
