<template>
  <div class="digital-flipper flex">
    <div
      class="num"
      v-for="(n,index) in numStr"
      :key="index">
      <div class="flex-none n flex-col" ref="n" :style="nStyle(n)">
        <span v-for="o in options"
          :key="o">{{o}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'digital-flipper',
  data() {
    return {
      options: new Array(10).fill().map((item, index) => index),
      nHeight: 0,
      value: 0,
      speed: 0.3,
    };
  },
  computed: {
    numStr() {
      return [...String(this.value || 0)];
    },
    nStyle() {
      return n => {
        // 计算n的高度
        const nSpan = this.$refs.n;
        if (nSpan) {
          this.nHeight = nSpan[0].offsetHeight;
        }
        return {
          marginTop: `-${n * this.nHeight}px`,
          transitionDuration: `${this.speed}s`,
        };
      };
    },
  },
  mounted() {
    this.nHeight = this.$refs.n[0].offsetHeight;
    setInterval(()=>{
      this.value += parseInt(Math.random()*10);
    },1000)
  },
};
</script>

<style lang="scss" scoped>
.num {
  flex: none;
  position: relative;
  width: 29px;
  height: 37px;
  border: 1px solid rgb(55, 114, 221);
  border-radius: 3px;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
  font-size: 28px;
  color: rgb(255, 242, 97);
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  margin-right: 4px;
  &:last-child {
    margin-right: 0;
  }
}
.n {
  position: relative;
  height: 100%;
  margin: 0;
  transition: 0.3s;
  span {
    display: inline-block;
    height: 100%;
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }
}
</style>
