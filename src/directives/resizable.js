import Vue from 'vue';
import _ from 'lodash';

// 添加该指令后，元素可拖拽
Vue.directive('resizable', {
  inserted(el, binding) {
    const type = binding.arg;
    const callbacks = binding.value;
    el.onmousedown = e => {
      // 计算缩放比例，因为可能元素是被transform:scale()处理过的
      const rate = el.getBoundingClientRect().width / el.offsetWidth;
      e.stopPropagation();
      const targetBox = el.offsetParent;
      const { style } = targetBox;
      // 初始偏移量
      let offsetX = 0;
      let offsetY = 0;
      // 节流函数
      function setSize() {
        const width = targetBox.offsetWidth + offsetX / rate;
        const height = targetBox.offsetHeight + offsetY / rate;
        switch (type) {
          case 'w':
            style.width = `${width}px`;
            break;
          case 'h':
            style.height = `${height}px`;
            break;
          case 'wh':
            style.width = `${width}px`;
            style.height = `${height}px`;
            break;
        }
        offsetX = 0;
        offsetY = 0;
      }
      const setSizeThrottle = _.throttle(setSize, 30);
      // 鼠标按下时监听在文档中鼠标移动事件
      document.onmousemove = ev => {
        offsetX += ev.movementX; // 累计偏移量X
        offsetY += ev.movementY; // 累计偏移量Y
        // console.log(offsetX);
        // setSize();
        setSizeThrottle();
      };

      document.onmouseup = () => {
        callbacks.resized &&
          callbacks.resized({
            width: targetBox.offsetWidth,
            height: targetBox.offsetHeight,
          });
        document.onmousemove = null;
        document.onmouseup = null;
      };
      return false;
    };
  },
});
