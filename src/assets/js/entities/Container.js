import { toJSON } from '../utils';
import Element from './Element';

// 默认配置
const defaultOptions = () => ({
  size: {
    width: 1920,
    height: 1080,
  },
  background: {
    color: '#000',
  },
  elements: [],
});

export default class Container {
  constructor(options = {}) {
    const mergedOptions = { ...defaultOptions(), ...options };
    Object.assign(this, mergedOptions);
    if (this.elements.length > 0) {
      // 如果传参中含有elements，则立即渲染
      const elements = this.elements.map(ele => {
        const element = new Element(ele);
        this.renderElement(element);
        return element;
      });
      this.elements = elements;
    }
  }

  toJSON() {
    return toJSON(this);
  }

  setWidth(width) {
    this.size.width = width;
  }

  setHeight(height) {
    this.size.height = height;
  }

  setBackgroundColor(color) {
    this.background.color = color;
  }

  // 添加元素
  addElement(element) {
    this.elements.push(element);
    this.renderElement(element);
  }

  renderElements(elements) {
    elements.forEach(ele => {
      this.renderElement(ele);
    });
  }

  renderElement(element) {
    // 根据配置创建元素
    const el = element.render();
    this.$el.appendChild(el);
  }

  getElements() {
    return this.elements;
  }
}
