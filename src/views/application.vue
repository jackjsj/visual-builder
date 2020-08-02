<template>
  <ContainerComponents
    ref="container"
    :editing="false">

  </ContainerComponents>
</template>

<script>
import ContainerComponents from '@/components/Container';
import Element from '@/components/Element';
import AppConfig from '@/assets/js/entities/AppConfig';
import Container from '@/assets/js/entities/Container';

export default {
  components: {
    ContainerComponents,
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 从缓存中读取配置
      const config = this.getConfig();
      // 根据配置构建应用
      this.build(config);
    },
    // 获取配置
    getConfig() {
      return JSON.parse(localStorage.getItem('appConfig') || '{}');
    },
    // 构建应用
    build(config) {
      // 初始化容器
      const { container: containerConfig } = config;
      document.title = `${containerConfig.name} - ${containerConfig.desc}`;
      const container = new Container({
        $el: this.$refs.container.$el, // $开头的参数不参与序列化
        ...containerConfig,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
