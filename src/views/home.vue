<template>
  <div class="home flex-col">
    <div class="header flex aic flex-none jcb">
      <div class="logo">
        大屏可视化应用构建平台
      </div>
      <!-- 插入元素工具 -->
      <div>
        <a-button
          @click="addElement('chart')">添加图表</a-button>
      </div>
      <!-- 构建相关 -->
      <div>
        <a-button type="primary"
          @click="buildApp">构建</a-button>
      </div>
    </div>
    <div class="flex1 flex ovh">
      <div class="left">
        <LayerCtrlPanel :containerConfig="containerConfig" />
      </div>
      <div class="center ova rel flex-col">
        <!-- 缩放控制器 -->
        <div class="zoom-ctrl flex aic flex-none">
          <span>面板缩放百分比</span>
          <div class="flex1 ml10">
            <a-slider v-model="scale"
              :max="200"
              :min="10"></a-slider>
          </div>
          <div class="fit-btn ml10 poi f18 flex aic jcc"
            @click="initScale">
            <a-icon type="shrink" />
          </div>
        </div>
        <!-- 这里要根据当前center 的宽度，来按比例缩放 -->
        <div class="flex1 container-wrapper ova rel">
          <ContainerComponent
            :config="containerConfig" />
        </div>
      </div>
      <div class="right ova">
        <ContainerConfigPanel :options="containerConfig"
          @change="onContainerConfigChange" v-if="$store.state.activeElements.length === 0" />
        <ChartConfigPanel v-else :options="$store.state.activeElements[0]"
          @change="onChartConfigChange" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ContainerComponent from '@/components/Container';
import echarts from 'echarts';
import { Slider } from 'ant-design-vue';
import AppConfig from 'entities/AppConfig';
import ContainerConfig from 'entities/Container';
import Element from 'entities/Element';
import ContainerConfigPanel from './configPanels/ContainerConfigPanel';
import ChartConfigPanel from './configPanels/ChartConfigPanel';
import LayerCtrlPanel from './configPanels/LayerCtrlPanel';

export default {
  components: {
    ContainerComponent,
    ContainerConfigPanel,
    ChartConfigPanel,
    LayerCtrlPanel,
    'a-slider': Slider,
  },
  data() {
    return {
      containerConfig: new ContainerConfig({
        $isGridVisible: true,
        $adaptive: true,
      }),
    };
  },
  computed: {
    scale: {
      get() {
        return this.containerConfig.$scale * 100;
      },
      set(scalePercentage) {
        this.containerConfig.setScale(scalePercentage / 100);
      },
    },
  },
  mounted() {
    this.init();
    // 测试
    this.addElement('chart');
  },
  methods: {
    // 初始化
    init() {
      // 初始化配置
      const appConfig = new AppConfig({
        container: this.containerConfig,
      });
      Vue.prototype.$appConfig = appConfig;
    },
    // 初始化缩放比例
    initScale() {
      this.containerConfig.setInitScale();
    },
    // 构建应用
    buildApp() {
      // 将当前配置保存
      this.saveConfig();
      // 打开页面
      const url = this.$router.resolve({
        path: 'application',
      });
      window.open(url.href, '_blank');
    },
    // 保存配置到缓存
    saveConfig() {
      localStorage.setItem('appConfig', JSON.stringify(this.$appConfig));
    },
    // 添加一个元素
    addElement(type) {
      // 取名
      const defaultName = '未命名';
      let name = defaultName;
      let nameIndex = 1;
      this.$appConfig
        .getContainer()
        .getElements()
        .forEach(item => {
          if (item.name === name) {
            name = `未命名${nameIndex++}`;
          }
        });
      // 添加相应配置
      this.$appConfig.getContainer().addElement(
        new Element({
          $editable: true, // 以$开头的参数将不进行序列化
          type,
          name,
          chartOption: {
            title: {
              text: 'ECharts 入门示例',
              textStyle: {
                color: '#fff',
              },
            },
            legend: {
              data: ['销量'],
              textStyle: {
                color: '#fff',
              },
            },
            xAxis: {
              data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
              axisLabel: {
                textStyle: {
                  color: '#fff',
                },
              },
            },
            yAxis: {
              axisLabel: {
                textStyle: {
                  color: '#fff',
                },
              },
            },
            series: [
              {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20],
              },
            ],
          },
        }),
      );
    },
    onContainerConfigChange(options) {
      // 触发容器渲染
      this.$appConfig.getContainer().render();
    },
    onChartConfigChange(options) {
      // 触发当前元素渲染
      options.render();
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
.header {
  height: 58px;
  background-color: #3a3f51;
  color: #a6a8b1;
  padding: 0 20px;
}
.logo {
  font-size: 32px;
}
.left {
  width: 220px;
  border-right: 2px solid #c5c5c5;
}
.center {
  flex: 1;
  .container-wrapper {
    padding: 0 20px;
    box-sizing: content-box;
  }
}
.right {
  width: 372px;
  border-left: 2px solid #c5c5c5;
}

.zoom-ctrl {
  width: 300px;
  height: 58px;
  margin-left: 20px;
  .fit-btn {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    background: rgba(0, 153, 255, 0.6);
    transition: 0.3s;
    color: #fff;
    &:hover {
      background: #09f;
    }
  }
}
</style>
