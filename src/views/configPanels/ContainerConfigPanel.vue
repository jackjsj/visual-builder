<template>
  <!-- 容器配置面板 -->
  <div class="config-panel">
    <div class="title">大屏容器配置</div>
    <div class="content">
      <a-form>
        <a-form-item label="大屏名称">
          <a-input v-model="options.name"
            allowClear />
        </a-form-item>
        <a-form-item label="大屏简介">
          <a-input type="textarea"
            v-model="options.desc"
            :maxLength="30"
            allowClear
            :row="2" />
        </a-form-item>
        <a-divider dashed></a-divider>
        <a-form-item label="大屏宽度(px)">
          <a-input-number :min="100" style="width:100%"
            v-model="options.size.width"
            @change="onChange" />
        </a-form-item>
        <a-form-item label="大屏高度(px)">
          <a-input-number :min="100" style="width:100%"
            v-model="options.size.height"
            @change="onChange" />
        </a-form-item>
        <a-divider dashed></a-divider>
        <a-form-item label="背景颜色">
          <!-- 这里可以换成vue-color -->
          <a-input type="color" v-model="options.background.color"
            @change="onChange"></a-input>
        </a-form-item>
        <a-divider dashed></a-divider>
        <a-form-item label="显示网格">
          <a-switch v-model="options.$isGridVisible" @change="onChange"></a-switch>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    options: {
      type: Object,
      default() {
        return {
          size: {},
          position: {},
          background: {},
        };
      },
    },
  },
  methods: {
    onChange() {
      this.$emit('change', this.options);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  height: 58px;
  line-height: 58px;
  background: #ddd;
  font-size: 20px;
  padding: 0 10px;
}
.ant-form-item {
  padding: 0 10px;
  margin-bottom: 0;
}
.ant-divider-horizontal {
  margin: 10px 0 0;
}
</style>
<style lang="scss">
textarea.ant-input {
  resize: none;
}
</style>
