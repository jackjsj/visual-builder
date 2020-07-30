import Vue from 'vue';
import echarts from 'echarts';

// 添加该指令后，元素可拖拽
Vue.directive('resizable', {
  inserted(el, binding) {
    let isMouseDown = false;
    let offsetX = 0;
    let offsetY = 0;
    let offsetWidth;
    let offsetHeight;
    let x;
    let y;
    const type = binding.arg;

    el.addEventListener('mousedown', e => {
      el.offsetParent.classList.add('resizing');
      e.stopPropagation();
      isMouseDown = true;
      ({ x: offsetX, y: offsetY } = e); // 记录下点击时的X值和Y值
      // 记录下初始宽度
      ({ offsetWidth, offsetHeight } = el.offsetParent);
    });
    const targetBox = el.offsetParent.offsetParent;
    targetBox.addEventListener('mousemove', e => {
      if (isMouseDown) {
        x = e.x - offsetX; // 相对于点击时的X值的偏移距离
        y = e.y - offsetY; // 相对于点击时的X值的偏移距离
        switch (type) {
          case 'w':
            // 让宽度加上偏移值
            el.offsetParent.style.width = `${offsetWidth + x}px`;
            break;
          case 'h':
            // 让宽度加上偏移值
            el.offsetParent.style.height = `${offsetHeight + y}px`;
            break;
          case 'wh':
            el.offsetParent.style.width = `${offsetWidth + x}px`;
            el.offsetParent.style.height = `${offsetHeight + y}px`;
            break;
        }
        // 尺寸改变，触发事件
        const myChart = echarts.init(document.getElementById('chart'));
        myChart.resize();
      }
    });
    targetBox.addEventListener('mouseup', () => {
      isMouseDown = false;
      el.offsetParent.classList.remove('resizing');
    });
  },
});
