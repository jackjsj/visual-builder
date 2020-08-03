<template>
  <BaseConfigPanel name="图层管理">
    <div class="ova h100p" @dragover.prevent="()=>{}"
      @drop.prevent="(e)=>onContainerDrop(e)">
      <div
        class="element-item"
        :class="{selected: activeElements.includes(getElementById(id))}"
        v-for="(id,index) in elementOrders"
        draggable="true"
        @dragover.prevent="()=>{}"
        @drop.prevent.stop="(e)=>onItemDrop(index,e)"
        @dragstart="(e)=>onItemDragStart(index,e)"
        :key="id"
        @click="onElementClick(getElementById(id))">
        <a-icon class="poi"
          :type="getElementById(id).visible ? 'eye':'eye-invisible'"
          @click.stop="toggleElement(getElementById(id))"></a-icon>
        <span class="ml10">{{getElementById(id).name}}</span>
      </div>
    </div>

  </BaseConfigPanel>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import ContainerConfig from 'entities/Container';
import BaseConfigPanel from './BaseConfigPanel';

export default {
  components: {
    BaseConfigPanel,
  },
  props: {
    containerConfig: {
      type: ContainerConfig,
      required: true,
    },
  },
  computed: {
    ...mapState(['activeElements']),
    elementOrders() {
      return this.containerConfig.getElementOrders();
    },
    elements() {
      return this.containerConfig.getElements();
    },
  },
  methods: {
    ...mapMutations([
      'addActiveElement',
      'removeActiveElement',
      'clearActiveElements',
    ]),
    onElementClick(item) {
      this.clearActiveElements();
      this.addActiveElement(item);
    },
    toggleElement(ele) {
      ele.visible = !ele.visible;
    },
    getElementById(id) {
      return this.elements.find(ele => ele.id === id);
    },
    onItemDrop(index, e) {
      const dragTargetIndex = Number(e.dataTransfer.getData('index'));
      // 将dragTarget 放置在 当前目标的前面
      if (index !== dragTargetIndex) {
        this.elementOrders.splice(
          index,
          0,
          this.elementOrders[dragTargetIndex],
        );
        this.elementOrders.splice(
          dragTargetIndex + (dragTargetIndex < index ? 0 : 1),
          1,
        );
      }
    },
    onItemDragStart(index, e) {
      e.dataTransfer.setData('index', index);
    },
    onContainerDrop(e) {
      // 放到队尾
      const dragTargetIndex = Number(e.dataTransfer.getData('index'));
      this.elementOrders.push(this.elementOrders[dragTargetIndex]);
      this.elementOrders.splice(dragTargetIndex, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.element-item {
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  border: 1px solid transparent;
  border-bottom: 1px solid #eee;
  transition: 0.3s;
  cursor: move;
  &.selected {
    color: #40a9ff;
    font-weight: bolder;
    border: 1px solid #40a9ff;
  }
}
</style>
