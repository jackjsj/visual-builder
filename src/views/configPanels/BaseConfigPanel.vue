<template>
  <!-- 容器配置面板 -->
  <div class="config-panel flex-col ova h100p">
    <div class="title flex-none">
      <slot name="header">{{$attrs.name}}</slot>
    </div>
    <div class="content flex1 ova">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss">
.config-panel {
  textarea.ant-input {
    resize: none;
  }
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
  .CodeMirror {
    border: 1px solid #eee;
    max-height: 380px;
  }
  .vc-chrome {
    width: auto;
    margin-bottom: 10px;
  }
}
</style>
