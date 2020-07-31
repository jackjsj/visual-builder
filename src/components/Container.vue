<template>
  <div class="container">
    <div class="grid-overlay" v-show="isGridVisible"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default() {
        return 1920;
      },
    },
    height: {
      type: Number,
      default() {
        return 1080;
      },
    },
    editing: {
      type: Boolean,
      default() {
        return true;
      },
    },
    isGridVisible: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  watch: {
    width(value) {
      this.resize();
      this.setWidth(value);
    },
    height(value) {
      this.setHeight(value);
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.resize();
      this.setWidth(this.width);
      this.setHeight(this.height);
    },
    setWidth(width) {
      this.$el.style.width = `${width}px`;
    },
    setHeight(height) {
      this.$el.style.height = `${height}px`;
    },
    resize() {
      // 设置缩放比例，根据外容器当前的宽度来决定
      const wrapperWidth = parseInt(
        getComputedStyle(this.$el.offsetParent, false).width,
        10,
      ); // 外容器的宽度
      // 计算缩放比例
      const scale = wrapperWidth / this.width;
      if (this.editing) this.$el.style.transform = `scale(${scale})`;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
  background: #000;
  position: relative;
  transform-origin: 0 0;
}
.grid-overlay {
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-size: 25px 25px, 25px 25px;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.1) 2px,
      transparent 0px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 2px, transparent 0px);
}
</style>
