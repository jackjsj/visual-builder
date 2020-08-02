<template>
  <BaseConfigPanel name="图表配置">
    <a-tabs default-active-key="1" type="card">
      <a-tab-pane key="1" tab="基础">
        <a-form>
          <a-form-item label="图表名称">
            <a-input v-model="options.name"
              allowClear />
          </a-form-item>
          <a-form-item label="图表简介">
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
                静态JSON
              </a-select-option>
              <a-select-option value="api" disabled>
                API拉取
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="请编辑">
            <div class="json-alert mb10">
              <a-alert message="JSON格式有误，解析失败！"
                type="error"
                banner
                closable
                :after-close="()=>{isJSONError = false}"
                v-if="isJSONError"></a-alert>
            </div>
            <codemirror class="lh20"
              v-model="code"
              :options="cmOptions"></codemirror>
            <div class="flex jcc mt10">
              <a-button type="primary" @click="refreshData">刷新数据</a-button>
            </div>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>

  </BaseConfigPanel>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
// language
import 'codemirror/mode/javascript/javascript.js';
// foldGutter
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/indent-fold.js';
// 全屏
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/addon/display/fullscreen.js';

import mixin from './mixin';

export default {
  mixins: [mixin],
  components: {
    codemirror,
  },
  data() {
    return {
      code: JSON.stringify(this.options.chartOption, null, 2),
      cmOptions: {
        tabSize: 2,
        smartIndent: true,
        mode: 'text/javascript',
        line: true,
        collapseIdentical: true,

        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,

        foldGutter: true,
        gutters: [
          'CodeMirror-linenumbers',
          'CodeMirror-foldgutter',
          'CodeMirror-lint-markers',
        ],

        // fullScreen: true,
      },
      isJSONError: false,
    };
  },
  watch: {
    options(newValue, oldValue) {
      this.code = JSON.stringify(newValue.chartOption, null, 2);
    },
  },
  methods: {
    refreshData() {
      try {
        this.options.setChartOption(JSON.parse(this.code));
      } catch {
        this.isJSONError = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
