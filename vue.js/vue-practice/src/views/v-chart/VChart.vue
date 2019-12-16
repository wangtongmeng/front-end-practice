<template>
  <div class="wrapper">
    <el-tabs :tab-position="tabPosition" v-model="activeName">
      <el-tab-pane v-for="item in compData" :label="item.label" :key="item.label" :name="item.label" lazy>
        <component :is="item.compName"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DemoLine from './components/Line'
import DemoBar from './components/Bar'
import DemoRadar from './components/Radar'
import DemoHeatmap from './components/Heatmap'
export default {
  components: {
    DemoLine,
    DemoBar,
    DemoRadar,
    DemoHeatmap
  },
  props: {},
  data() {
    return {
      activeName: '折线图',
      compData: [
        { label: '折线图', compName: 'DemoLine' },
        { label: '条形图', compName: 'DemoBar' },
        { label: '雷达图', compName: 'DemoRadar' },
        { label: '地图热力图', compName: 'DemoHeatmap' }
      ],
      tabPosition: "left"
    };
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>