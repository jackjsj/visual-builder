import { toJSON } from '../utils';

let elementId = 0;

const defaultOptions = {
  position: {
    top: 20,
    left: 20,
  },
  size: {
    width: 400,
    height: 300,
  },
};

export default class Element {
  constructor(options = {}) {
    const _options = { ...defaultOptions, ...options };
    this.id = elementId++;
    this.position = _options.position;
    this.size = _options.size;
    this.$editable = _options.editable;
  }

  toJSON() {
    toJSON(this);
  }

  setTop(top) {
    this.position.top = top;
  }

  setLeft(left) {
    this.position.left = left;
  }
}
