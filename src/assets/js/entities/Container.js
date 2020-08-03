import { toJSON } from '../utils';
import Element from './Element';

// 默认配置
const defaultOptions = () => ({
  name: '未命名',
  desc: '这是一个大屏数据可视化应用',
  size: {
    width: 1920,
    height: 1080,
  },
  background: {
    color: '#000',
  },
  elements: [],
  $scale: 1,
  $isGridVisible: false,
  elementOrders: [],
});

export default class Container {
  constructor(options = {}) {
    this.setOptions(options);
  }

  setOptions(options) {
    const mergedOptions = { ...defaultOptions(), ...options };
    Object.assign(this, mergedOptions);
    if (this.elements.length > 0) {
      // 如果传参中含有elements，则立即渲染
      const elements = this.elements.map(ele => {
        const element = new Element(ele);
        this.$el.appendChild(element.$el);
        return element;
      });
      this.elements = elements;
    }
    if (this.$el) {
      this.mount(this.$el);
    }
  }

  toJSON() {
    return toJSON(this);
  }

  getWidth() {
    return this.size.width;
  }

  setWidth(width) {
    this.size.width = width;
  }

  getHeight() {
    return this.size.height;
  }

  setHeight(height) {
    this.size.height = height;
  }

  getBackgroundColor() {
    return this.background.color;
  }

  setBackgroundColor(color) {
    this.background.color = color;
  }

  getElementOrders() {
    return this.elementOrders;
  }

  mount(el) {
    this.$el = el;
    // 渲染
    this.render();
  }

  render() {
    // 获取容器宽高
    const { width, height } = this.size;
    // 获取背景颜色
    const { color } = this.background;
    // 设置
    this.$el.style.width = `${width}px`;
    this.$el.style.height = `${height}px`;
    this.$el.style.backgroundColor = `${color}`;
    // 是否自适应
    if (this.$adaptive) {
      // 设置缩放比例，根据外容器当前的宽度来决定
      this.setInitScale();
    }
  }

  setInitScale() {
    const wrapperWidth = parseInt(
      getComputedStyle(this.$el.parentElement, false).width,
      10,
    ); // 外容器的宽度
    const scale = wrapperWidth / this.$el.offsetWidth;
    this.setScale(scale);
  }

  setScale(scale) {
    this.$scale = scale;
    this.$el.style.transform = `scale(${scale})`;
  }

  // 添加元素
  addElement(element) {
    // 根据当前配置分配一个合理的位置
    const position = this.getReasonablePosition(element);
    element.setPosition(position);
    // 给element 配置实例添加一个指针指向 container 配置实例
    element.setContainer(this);
    this.elements.push(element);
    this.$el.appendChild(element.$el);
    this.elementOrders.unshift(element.id); // 后加的元素放置在队首
  }

  getReasonablePosition(element) {
    // 位置分配策略：默认是30，30，如果已存在，则在此基础上增加30，30，如果依然存在，则一直循环，直到找到合理的位置为止。
    const elements = this.getElements(); // 获取已存在的元素
    const existedPositions = elements.map(
      ele => `${ele.getLeft()}x${ele.getTop()}`,
    ); // 获取已存在的位置
    const pos = element.position || {
      left: 30,
      top: 30,
    };
    while (true) {
      const _pos = `${pos.left}x${pos.top}`;
      if (existedPositions.includes(_pos)) {
        pos.left += 30;
        pos.top += 30;
      } else {
        return pos;
      }
    }
  }

  removeElement(element) {
    const targetIndex = this.elements.indexOf(element);
    if (targetIndex > -1) {
      this.elements.splice(targetIndex, 1);
    }
    const targetOrder = this.getElementOrders().indexOf(element.id);
    if (targetOrder > -1) {
      this.getElementOrders().splice(targetOrder, 1);
    }
  }

  getElements() {
    return this.elements;
  }
}
