import Vue from 'vue';
import ElementComponent from '@/components/Element';
import { toJSON } from '../utils';

// 默认配置
const defaultOptions = {
  size: {
    width: 1920,
    height: 1080,
  },
  background: {
    color: '#000',
  },
  elements: [],
};

export default class Container {
  constructor(options = {}) {
    const _options = { ...defaultOptions, ...options };
    this.size = _options.size;
    this.background = _options.size;
    this.elements = _options.elements;
    this.$el = _options.el;
  }

  toJSON() {
    toJSON(this);
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

  renderElement(element) {
    // 根据配置创建元素
    const { size, position } = element; // 大小，位置
    const ElementConstructor = Vue.extend(ElementComponent);
    console.log(1);
    const elementInstance = new ElementConstructor({
      propsData: {
        isEditing: element.$editable,
      },
    });
    elementInstance.$mount();
    const el = elementInstance.$el;
    el.style.top = `${position.top}px`;
    el.style.left = `${position.left}px`;
    el.style.width = `${size.width}px`;
    el.style.height = `${size.height}px`;

    this.$el.appendChild(el);
  }

  getElements() {
    return this.elements;
  }
}
