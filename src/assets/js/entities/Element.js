import Vue from 'vue';
import ElementComponent from '@/components/Element';
import echarts from 'echarts';
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
    this.$el.style.top = `${top}px`;
  }

  getTop() {
    return this.position.top;
  }

  setLeft(left) {
    this.position.left = left;
    this.$el.style.left = `${left}px`;
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

  setWidth(width) {
    this.size.width = width;
    this.$el.style.width = `${width}px`;
    this.fill();
  }

  setHeight(height) {
    this.size.height = height;
    this.$el.style.height = `${height}px`;
    this.fill();
  }

  // 设置 element的容器配置实例
  setContainer(container) {
    this.$container = container;
  }

  setChartOption(chartOption) {
    this.chartOption = chartOption;
    this.fill();
  }

  // 渲染方法
  render() {
    const { $editable } = this; // 大小，位置
    const element = this;
    // 创建Vue实例并挂载到容器中
    const ElementConstructor = Vue.extend(ElementComponent);
    const elementVM = new ElementConstructor({
      propsData: {
        editable: $editable,
      },
      created() {
        if ($editable) {
          // 设置拖拽回调
          this.callbacks = {
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
    elementVM.$mount(); // vue 实例挂载
    const el = elementVM.$el;
    this.$el = el;
    this.$elementVM = elementVM; // 在配置实例上添加一个指针指向对应的 vue实例
    elementVM.$target = this; // 在vue实例上添加一个指针指向配置实例本身
    this.setStyle(el);
    // 将指定类型的内容填充到元素中
    this.fill();
    return el; // 返回一个el
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
    if (!this.$elementVM) return;
    const { type, chartOption } = this; // 大小，位置
    if (type === 'chart') {
      this.$elementVM.$nextTick(() => {
        const chart = echarts.init(this.$elementVM.$refs.content);
        chart.setOption(chartOption);
        chart.resize();
      });
    }
  }

  // 自毁方法
  destroy() {
    this.$container.removeElement(this); // 从容器配置实例中删除
    this.$elementVM.$destroy(); // vue实例销毁
  }
}
