<template>
  <!-- 编辑状态 keydown添加prevent，避免页面滚动 -->
  <div tabIndex="0"
    :style="style"
    class="element editing" v-dragable="callbacks" v-if="config.$editable"
    @mousedown="onElementClick"
    @keydown="onKeyDown"
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
    <div class="offset-line" :coord="coord">
      <!-- 指示线 -->
    </div>
    <div class="active-btn-group abs flex aic" v-show="active">
      <div class="active-btn del-btn">
        <a-popconfirm title="确定要删除此元素吗？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="deleteElement">
          <a-icon type="delete" title="删除" ref="delBtn"></a-icon>
        </a-popconfirm>
      </div>
      <div class="active-btn copy-btn" @click="copyElement">
        <a-icon type="copy" title="复制"></a-icon>
      </div>
    </div>
    <div class="w100p h100p rel ovh">
      <div class="w100p h100p rel ovh" ref="content">
        这是一个空的元素
      </div>
    </div>
  </div>
  <!-- 非编辑状态 -->
  <div class="element"
    :style="style"
    v-else>
    <div class="w100p h100p rel ovh" ref="content">
    </div>
  </div>
</template>

<script>
import '@/directives/dragable';
import '@/directives/resizable';
import { Icon, Popconfirm } from 'ant-design-vue';
import { mapMutations, mapState } from 'vuex';

export default {
  components: {
    'a-icon': Icon,
    'a-popconfirm': Popconfirm,
  },
  data() {
    return {
      callbacks: {},
      coord: '',
    };
  },
  computed: {
    ...mapState(['activeElements']),
    style() {
      return {
        width: `${this.config.getWidth()}px`,
        height: `${this.config.getHeight()}px`,
        top: `${this.config.getTop()}px`,
        left: `${this.config.getLeft()}px`,
        backgroundColor: this.config.getBackgroundColor(),
        zIndex: this.config.getZIndex(),
        display: this.config.visible ? 'block' : 'none',
      };
    },
    active() {
      return this.activeElements.includes(this.config);
    },
  },
  mounted() {
    // 监听当前元素的样式变化;
    this.observerElStyleChange();
  },
  methods: {
    ...mapMutations(['addActiveElement', 'removeActiveElement']),
    // 监听样式变化
    observerElStyleChange() {
      const observer = new MutationObserver(mutations => {
        mutations.forEach(({ type, attributeName, target }) => {
          if (type === 'attributes' && attributeName === 'style') {
            const { offsetLeft: left, offsetTop: top } = target;
            this.coord = `${left}, ${top}`;
          }
        });
      });
      observer.observe(this.$el, {
        attributes: true,
        attributeFilter: ['style'],
      });
    },
    deleteElement() {
      this.config.getContainer().$el.click();
      this.removeActiveElement(this.config);
      this.config.destroy();
      this.$destroy();
    },
    copyElement() {
      this.config.copy();
    },
    onElementClick() {
      this.addActiveElement(this.config);
    },
    onKeyDown(e) {
      const { code } = e;
      if (this[`on${code}`]) {
        e.preventDefault();
        this[`on${code}`]();
      }
    },
    onDelete() {
      this.$refs.delBtn.$el.click();
    },
    onArrowUp() {
      this.config.moveToTop(-1);
    },
    onArrowDown() {
      this.config.moveToTop(1);
    },
    onArrowLeft() {
      this.config.moveToLeft(-1);
    },
    onArrowRight() {
      this.config.moveToLeft(1);
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
      .active-btn-group {
        right: 0;
      }
      .active-btn {
        width: 28px;
        height: 28px;
        background: #09f;
        display: flex;
        align-items: center;
        z-index: 1;
        justify-content: center;
        margin-left: 10px;
        font-size: 20px;
        cursor: pointer;
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
