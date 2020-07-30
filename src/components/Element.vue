<template>
  <div class="element active" v-dragable>
    <!-- element 激活状态下显示的 -->
    <div class="width-resizer" v-resizable:w>
      <!-- 宽度调节器 -->
    </div>
    <div class="height-resizer" v-resizable:h>
      <!-- 高度调节器 -->
    </div>
    <div class="wh-resizer" v-resizable:wh>
      <!-- 宽高调节器 -->
    </div>
    <div class="offset-line" coord="20, 20">
      <!-- 指示线 -->
    </div>
    <slot>

    </slot>
  </div>
</template>

<script>
import '@/directives/dragable';
import '@/directives/resizable';

export default {};
</script>

<style lang="scss" scoped>
.element {
  position: relative;
  top: 20px;
  left: 20px;
  width: 600px;
  height: 400px;
  background: rgba(0, 153, 255, 0.1);
  border: 2px solid transparent;
  &:hover {
    border: 2px solid #09f;
    cursor: move;
  }
  color: #ccc;
  &.active {
    border: 2px solid #09f;
    cursor: move;
    .resizer {
      position: absolute;
    }
    .width-resizer {
      @extend .resizer;
      right: -8px;
      top: 50%;
      margin-top: -8px;
      width: 8px;
      height: 16px;
      background: #09f;
      cursor: w-resize;
    }
    .height-resizer {
      @extend .resizer;
      bottom: -8px;
      right: 50%;
      margin-left: -8px;
      height: 8px;
      width: 16px;
      background: #09f;
      cursor: s-resize;
    }
    .wh-resizer {
      @extend .resizer;
      bottom: -8px;
      right: -8px;
      width: 8px;
      height: 8px;
      border-right: 8px solid #09f;
      border-bottom: 8px solid #09f;
      cursor: se-resize;
    }
  }
  .offset-line {
    position: absolute;
    top: 0;
    width: 10000px;
    height: 10000px;
    border: 1px dashed #09f;
    background: transparent;
    transform: translate(-100%, -100%);
    &::after {
      position: absolute;
      font-size: 20px;
      bottom: 10px;
      right: 10px;
      color: #09f;
      content: attr(coord);
    }
  }
  &.resizing {
    border: none;
    .resizer {
      visibility: hidden;
    }
    .width-resizer,
    .height-resizer,
    .wh-resizer {
      @extend .resizer;
    }
  }
}
</style>
