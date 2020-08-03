import Vue from 'vue';

// 添加该指令后，元素可拖拽
Vue.directive('dragable', {
  inserted(el, binding) {
    const callbacks = binding.value;

    el.onmousedown = e => {
      const interval = 1; // 设置移动最小间隔
      let offsetX = 0;
      let offsetY = 0;
      // 记录初始位置
      function move(ev) {
        // 计算缩放比例，因为可能元素是被transform:scale()处理过的
        const rate = el.getBoundingClientRect().width / el.offsetWidth;
        offsetX += ev.movementX / rate; // 累计偏移量X
        offsetY += ev.movementY / rate; // 累计偏移量Y
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
