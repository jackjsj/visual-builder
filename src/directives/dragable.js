import Vue from 'vue';

// 添加该指令后，元素可拖拽
Vue.directive('dragable', {
  inserted(el, binding) {
    const callbacks = binding.value;

    el.onmousedown = e => {
      // 记录初始位置
      function move(ev) {
        // 计算缩放比例，因为可能元素是被transform:scale()处理过的
        const rate = el.getBoundingClientRect().width / el.offsetWidth;
        const left = el.offsetLeft + ev.movementX / rate;
        const top = el.offsetTop + ev.movementY / rate;
        // 计算移动后的top left
        el.style.top = `${top}px`;
        el.style.left = `${left}px`;
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
