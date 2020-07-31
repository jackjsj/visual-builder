<template>
  <!-- 编辑状态 -->
  <div class="element editing" v-dragable="callbacks" v-if="editable"
    @mousedown="onElementClick"
    :class="{active}">
    <!-- element 激活状态下显示的 -->
    <div class="width-resizer" v-resizable:w="callbacks">
      <!-- 宽度调节器 -->
    </div>
    <div class="height-resizer" v-resizable:h="callbacks">
      <!-- 高度调节器 -->
    </div>
    <div class="wh-resizer" v-resizable:wh="callbacks">
      <!-- 宽高调节器 -->
    </div>
    <div class="offset-line" :coord="`${left}, ${top}`">
      <!-- 指示线 -->
    </div>
    <div class="w100p h100p rel" ref="content">
      这是一个空的元素
    </div>
  </div>
  <!-- 非编辑状态 -->
  <div class="element" v-else>
    <div class="w100p h100p rel" ref="content">
    </div>
  </div>
</template>

<script>
import '@/directives/dragable';
import '@/directives/resizable';

export default {
  data() {
    return {
      top: 20,
      left: 20,
      callbacks: {},
      active: false,
    };
  },
  props: {
    editable: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  methods: {
    onElementClick() {
      this.active = true;
      const el = this.$el;
      const onDocumentClick = e => {
        if (!e.path.includes(el)) {
          this.active = false;
          document.removeEventListener('click', onDocumentClick);
        }
      };
      document.addEventListener('click', onDocumentClick);
    },
  },
};
</script>

<style lang="scss" scoped>
.element {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 600px;
  height: 400px;
  background: rgba(0, 153, 255, 0.1);
  border: 2px solid transparent;
  &.editing {
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
        width: 16px;
        height: 16px;
        border-right: 8px solid #09f;
        border-bottom: 8px solid #09f;
        cursor: se-resize;
      }
      .offset-line {
        pointer-events: none;
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
}
</style>
