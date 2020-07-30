<template>
  <div class="home flex-col">
    <div class="header flex aic flex-none">
      <div class="logo ml20">
        大屏可视化平台
      </div>
    </div>
    <div class="flex1 flex ovh">
      <!-- <div class="left">
        图层管理
      </div> -->
      <div class="center ova rel">
        <!-- 这里要根据当前center 的宽度，来按比例缩放 -->
        <Container>
          <Element>
            <div id="chart" style="width:100%;height:100%;"></div>
          </Element>
        </Container>
      </div>
      <div class="right">
        <div class="sub-title">配置</div>
      </div>
    </div>
  </div>
</template>

<script>
import Container from '@/components/Container';
import Element from '@/components/Element';
import echarts from 'echarts';

export default {
  components: {
    Container,
    Element,
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('chart'));

    // 指定图表的配置项和数据
    const option = {
      title: {
        text: 'ECharts 入门示例',
      },
      tooltip: {},
      legend: {
        data: ['销量'],
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
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
  padding: 40px;
}
.right {
  width: 372px;
  border-left: 2px solid #c5c5c5;
}
.sub-title {
  height: 40px;
  line-height: 40px;
  background: #ddd;
  font-size: 20px;
  padding: 0 10px;
}
</style>
