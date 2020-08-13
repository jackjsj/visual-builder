<template>
  <BaseConfigPanel name="数字翻牌器配置">
    <a-tabs default-active-key="1" type="card">
      <a-tab-pane key="1" tab="基础">
        <a-form>
          <a-form-item label="名称">
            <a-input v-model="options.name"
              allowClear />
          </a-form-item>
          <a-form-item label="简介">
            <a-input type="textarea"
              v-model="options.desc"
              :maxLength="30"
              allowClear
              :row="2" />
          </a-form-item>
          <a-divider dashed></a-divider>
          <a-form-item label="宽度(px)">
            <a-input-number :min="100" style="width:100%"
              v-model="width" />
          </a-form-item>
          <a-form-item label="高度(px)">
            <a-input-number :min="100" style="width:100%"
              v-model="height" />
          </a-form-item>
          <a-divider dashed></a-divider>
          <a-form-item label="X坐标(px)">
            <a-input-number style="width:100%"
              v-model="left" />
          </a-form-item>
          <a-form-item label="Y坐标(px)">
            <a-input-number style="width:100%"
              v-model="top" />
          </a-form-item>
          <a-divider dashed></a-divider>
          <a-form-item label="背景颜色">
            <color-picker
              v-model="backgroundColor" />
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="数据">
        <a-form>
          <a-form-item label="数据绑定方式">
            <a-select default-value="json" style="width: 100%">
              <a-select-option value="json">
                静态
              </a-select-option>
              <a-select-option value="api" disabled>
                API拉取
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="数值">
            <a-input-number style="width:100%"
              v-model="value" />
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>

  </BaseConfigPanel>
</template>

<script>
import mixin from './mixin';

export default {
  mixins: [mixin],
  data() {
    return {
    };
  },
  computed: {
    value:{
      set(val){
        this.options.setCompOption({
          value:val,
        });
      },
      get(){
        return this.options.compOption.value;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
