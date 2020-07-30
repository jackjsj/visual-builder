<template>
  <div class="container">
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
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 初始化宽高
      this.$el.style.width = `${this.width}px`;
      this.$el.style.height = `${this.height}px`;
      // 设置缩放比例，根据外容器当前的宽度来决定
      const wrapperWidth = parseInt(
        getComputedStyle(this.$el.offsetParent, false).width,
        10,
      ); // 外容器的宽度
      // 计算缩放比例
      const scale = wrapperWidth / this.width;
      console.log(scale);
      this.$el.style.transform = `scale(${scale})`;
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
</style>
