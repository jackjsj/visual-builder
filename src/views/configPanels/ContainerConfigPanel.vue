<template>
  <!-- 容器配置面板 -->
  <BaseConfigPanel name="大屏容器配置">
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
          v-model="width" />
      </a-form-item>
      <a-form-item label="大屏高度(px)">
        <a-input-number :min="100" style="width:100%"
          v-model="height" />
      </a-form-item>
      <a-divider dashed></a-divider>
      <a-form-item label="背景颜色">
        <color-picker
          v-model="backgroundColor" />
      </a-form-item>
      <a-divider dashed></a-divider>
      <a-form-item label="显示网格">
        <a-switch v-model="options.$isGridVisible"></a-switch>
      </a-form-item>
    </a-form>
  </BaseConfigPanel>
</template>

<script>
import mixin from './mixin';

export default {
  mixins: [mixin],
};
</script>

<style lang="scss" scoped></style>
