import Vue from 'vue';

// 添加该指令后，元素可拖拽
Vue.directive('dragable', {
  inserted(el, binding) {
    const type = binding.arg;
    let isMouseDown = false;
    let offsetX = 0;
    let offsetY = 0;
    let x;
    let y;

    // 监听鼠标点击事件
    el.addEventListener('mousedown', e => {
      e.stopPropagation();
      isMouseDown = true;
      ({ offsetX, offsetY } = e);
    });
    el.addEventListener('mousemove', e => {
      if (isMouseDown) {
        x = e.offsetX - offsetX;
        y = e.offsetY - offsetY;
        let { offsetTop: top, offsetLeft: left } = el;
        top += y;
        left += x;
        el.style.top = `${top}px`;
        el.style.left = `${left}px`;
        el.querySelector('.offset-line').setAttribute(
          'coord',
          `${left}, ${top}`,
        );
      }
    });
    function reset() {
      isMouseDown = false;
      offsetX = 0;
      offsetY = 0;
    }
    el.addEventListener('mouseup', reset);
    el.addEventListener('mouseout', reset);
  },
  update(el, binding) {},
});
