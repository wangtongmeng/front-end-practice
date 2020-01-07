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
import DemoMap from './components/Map'
import DemoMap2 from './components/Map2'
import DemoBar from './components/Bar'
export default {
  components: {
    DemoBar,
    DemoMap,
    DemoMap2,
  },
  props: {},
  data() {
    return {
      activeName: '地图',
      compData: [
        { label: '折线图', compName: 'DemoBar' },
        // { label: '地图', compName: 'DemoMap' },
        { label: '地图2', compName: 'DemoMap2' },
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