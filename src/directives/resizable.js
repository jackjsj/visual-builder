import Vue from 'vue';

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
      // 鼠标按下时监听在文档中鼠标移动事件
      document.onmousemove = ev => {
        const width = targetBox.offsetWidth + ev.movementX / rate;
        const height = targetBox.offsetHeight + ev.movementY / rate;
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
      };
      document.onmouseup = () => {

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
