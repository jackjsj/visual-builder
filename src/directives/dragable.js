import Vue from 'vue';
import _ from 'lodash';

// 添加该指令后，元素可拖拽
Vue.directive('dragable', {
  inserted(el, binding) {
    const callbacks = binding.value;

    el.onmousedown = e => {
      const interval = 1; // 设置移动最小间隔
      // 初始偏移量
      let offsetX = 0;
      let offsetY = 0;
      // 计算缩放比例，因为可能元素是被transform:scale()处理过的
      const rate = el.getBoundingClientRect().width / el.offsetWidth;
      function render() {
        offsetX /= rate;
        offsetY /= rate;
        if (Math.abs(offsetX) >= interval) {
          // 当偏移量到达最小间隔，才开始移动
          const _offsetX =
            offsetX > 0
              ? Math.ceil(offsetX / interval) * interval
              : Math.floor(offsetX / interval) * interval;
          const left = el.offsetLeft + _offsetX;
          el.style.left = `${left}px`;
          offsetX -= _offsetX; // 将剩余的偏移量保留，用于下次累计
        }
        if (Math.abs(offsetY) >= interval) {
          // 当偏移量到达最小间隔，才开始移动
          const _offsetY =
            offsetY > 0
              ? Math.ceil(offsetY / interval) * interval
              : Math.floor(offsetY / interval) * interval;
          const top = el.offsetTop + _offsetY;
          el.style.top = `${top}px`;
          offsetY -= _offsetY; // 将剩余的偏移量保留，用于下次累计
        }
      }
      const renderThrottle = _.throttle(render, 30); // 节流控制
      function move(ev) {
        offsetX += ev.movementX; // 累计偏移量X
        offsetY += ev.movementY; // 累计偏移量Y
        renderThrottle(); // 节流
      }
      document.onmousemove = move;
      document.onmouseup = () => {
        callbacks.onDragEnd &&
          callbacks.onDragEnd({
            left: el.offsetLeft,
            top: el.offsetTop,
          });
        document.onmousemove = null;
        document.onmouseup = null;
      };
      return false;
    };
  },
});
