<template>
  <ContainerComponents
    ref="container"
    :editing="false"
    :width="width"
    :height="height">

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
  data() {
    return {
      width: 1920,
      height: 1080,
    };
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
      const container = new Container({
        $el: this.$refs.container.$el, // $开头的参数不参与序列化
        ...config.container,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
