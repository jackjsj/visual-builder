<template>
  <div class="container">
    <div class="grid-overlay" v-show="isGridVisible"></div>
    <slot></slot>

  </div>
</template>

<script>
export default {
  props: {
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
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
  position: relative;
  background: #000;
  transform-origin: 0 0;
}
.grid-overlay {
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-size: 30px 30px;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.1) 2px,
      transparent 0px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 2px, transparent 0px);
}
</style>
